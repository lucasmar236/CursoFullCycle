package main

import (
	"balances/internal/database"
	"balances/internal/event/handler"
	"balances/internal/usecase/get_balance"
	"balances/internal/usecase/update_balance"
	"balances/internal/web"
	"balances/internal/web/webserver"
	"balances/pkg/kafka"
	uow2 "balances/pkg/uow"
	"context"
	"database/sql"
	"fmt"
	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local",
		"root", "root", "mysqlBalance", "3307", "wallet"))
	if err != nil {
		panic(err)
	}
	defer db.Close()

	configMap := ckafka.ConfigMap{
		"bootstrap.servers": "kafka:29092",
		"group.id":          "wallet",
	}
	kafkaConsumer := kafka.NewConsumer(&configMap, []string{"balances"})

	ctx := context.Background()
	uow := uow2.NewUow(ctx, db)

	uow.Register("BalanceDB", func(tx *sql.Tx) interface{} {
		return database.NewBalanceDB(db)
	})

	updateBalanceUseCase := update_balance.NewUpdateBalanceUseCase(uow)
	getBalanceUseCase := get_balance.NewBalanceGetUseCase(uow)

	go handler.NewUpdateBalanceKafkaHandler(kafkaConsumer, updateBalanceUseCase).Handle()

	ws := webserver.NewWebServer(":3003")

	balanceHandler := web.NewWebBalanceHandler(*getBalanceUseCase)

	ws.AddHandler("/balances/{id}", balanceHandler.GetBalance)

	fmt.Println("Starting balance service")
	ws.Start()
}
