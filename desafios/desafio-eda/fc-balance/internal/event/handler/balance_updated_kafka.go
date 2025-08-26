package handler

import (
	"balances/internal/event"
	"balances/internal/usecase/update_balance"
	"balances/pkg/kafka"
	"context"
	"fmt"
	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"log"
)

type UpdateBalanceKafkaHandler struct {
	Kafka                *kafka.Consumer
	updateBalanceUseCase *update_balance.UpdateBalanceUseCase
}

func NewUpdateBalanceKafkaHandler(kafka *kafka.Consumer,
	updateBalanceUseCase *update_balance.UpdateBalanceUseCase) *UpdateBalanceKafkaHandler {
	return &UpdateBalanceKafkaHandler{
		Kafka:                kafka,
		updateBalanceUseCase: updateBalanceUseCase,
	}
}

func (h *UpdateBalanceKafkaHandler) Handle() {
	msgChan := make(chan *ckafka.Message)
	err := h.Kafka.Consume(msgChan)
	if err != nil {
		log.Println(err)
	}

	for msg := range msgChan {
		fmt.Println("UpdateBalanceKafkaHandler called")
		eventBalance := event.NewBalanceUpdated()
		err := eventBalance.SetPayload(msg.Value)
		if err != nil {
			log.Println(err)
		}
		_, err = h.updateBalanceUseCase.Execute(context.Background(), eventBalance.GetPayload())
		if err != nil {
			fmt.Println(err)
		}
	}
}
