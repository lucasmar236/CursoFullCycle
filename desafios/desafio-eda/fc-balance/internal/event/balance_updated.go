package event

import (
	"balances/internal/usecase/update_balance"
	"encoding/json"
	"time"
)

type BalanceUpdated struct {
	Name    string                                `json:"Name"`
	Payload update_balance.BalanceUpdatedInputDTO `json:"Payload"`
}

func NewBalanceUpdated() *BalanceUpdated {
	return &BalanceUpdated{
		Name: "BalanceUpdated",
	}
}

func (e *BalanceUpdated) GetName() string {
	return e.Name
}

func (e *BalanceUpdated) GetPayload() *update_balance.BalanceUpdatedInputDTO {
	return &e.Payload
}

func (e *BalanceUpdated) SetPayload(payload []byte) error {
	err := json.Unmarshal(payload, &e)
	if err != nil {
		return err
	}
	return nil
}

func (e *BalanceUpdated) GetDateTime() time.Time {
	return time.Now()
}
