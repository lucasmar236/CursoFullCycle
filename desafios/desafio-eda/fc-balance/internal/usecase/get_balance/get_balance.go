package get_balance

import (
	"balances/internal/entity"
	"balances/internal/gateway"
	"balances/pkg/uow"
	"context"
)

type BalanceGetInputDTO struct {
	AccountID string `json:"accountID"`
}

type BalanceGetOutputDTO struct {
	Balance float64 `json:"balance"`
}

type BalanceGetUseCase struct {
	Uow uow.UowInterface
}

func NewBalanceGetUseCase(uow uow.UowInterface) *BalanceGetUseCase {
	return &BalanceGetUseCase{
		Uow: uow,
	}
}

func (uc *BalanceGetUseCase) Execute(ctx context.Context, input *BalanceGetInputDTO) (*BalanceGetOutputDTO, error) {
	var (
		balance *entity.Balance
		err     error
	)
	err = uc.Uow.Do(ctx, func(_ *uow.Uow) error {
		balanceRepository := uc.getBalanceRepository(ctx)
		balance, err = balanceRepository.FindByID(input.AccountID)
		if err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		return nil, err
	}
	return &BalanceGetOutputDTO{
		Balance: balance.Balance,
	}, nil
}

func (uc *BalanceGetUseCase) getBalanceRepository(ctx context.Context) gateway.BalanceGateway {
	repo, err := uc.Uow.GetRepository(ctx, "BalanceDB")
	if err != nil {
		panic(err)
	}
	return repo.(gateway.BalanceGateway)
}
