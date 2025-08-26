package gateway

import "balances/internal/entity"

type BalanceGateway interface {
	FindByID(id string) (*entity.Balance, error)
	Update(balance *entity.Balance) error
}
