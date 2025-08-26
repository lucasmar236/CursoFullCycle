package database

import (
	"balances/internal/entity"
	"database/sql"
)

type BalanceDB struct {
	DB *sql.DB
}

func NewBalanceDB(db *sql.DB) *BalanceDB {
	return &BalanceDB{
		DB: db,
	}
}

func (b *BalanceDB) FindByID(id string) (*entity.Balance, error) {
	var balance entity.Balance

	stmt, err := b.DB.Prepare("SELECT id,balance FROM accounts WHERE id = ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	row := stmt.QueryRow(id)
	err = row.Scan(&balance.AccountID, &balance.Balance)
	if err != nil {
		return nil, err
	}
	return &balance, nil
}

func (b *BalanceDB) Update(balance *entity.Balance) error {
	stmt, err := b.DB.Prepare("UPDATE accounts SET balance = ? WHERE id = ?")
	if err != nil {
		return err
	}
	defer stmt.Close()
	_, err = stmt.Exec(balance.Balance, balance.AccountID)
	if err != nil {
		return err
	}
	return nil
}
