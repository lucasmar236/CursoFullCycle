package update_balance

import (
	"balances/internal/entity"
	"balances/internal/gateway"
	"balances/pkg/uow"
	"context"
)

type BalanceUpdatedInputDTO struct {
	AccountIDFrom        string  `json:"account_id_from"`
	AccountIDTo          string  `json:"account_id_to"`
	BalanceAccountIDFrom float64 `json:"balance_account_id_from"`
	BalanceAccountIDTo   float64 `json:"balance_account_id_to"`
}

type BalanceUpdatedOutputDTO struct{}

type UpdateBalanceUseCase struct {
	Uow uow.UowInterface
}

func NewUpdateBalanceUseCase(uow uow.UowInterface) *UpdateBalanceUseCase {
	return &UpdateBalanceUseCase{
		Uow: uow,
	}
}

func (uc *UpdateBalanceUseCase) Execute(ctx context.Context, input *BalanceUpdatedInputDTO) (*BalanceUpdatedOutputDTO, error) {
	err := uc.Uow.Do(ctx, func(_ *uow.Uow) error {
		balanceRepository := uc.getBalanceRepository(ctx)
		accounTo := entity.NewAccount(input.AccountIDTo, input.BalanceAccountIDTo)
		err := balanceRepository.Update(accounTo)
		if err != nil {
			return err
		}
		accounFrom := entity.NewAccount(input.AccountIDFrom, input.BalanceAccountIDFrom)
		err = balanceRepository.Update(accounFrom)
		if err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		return nil, err
	}
	return &BalanceUpdatedOutputDTO{}, nil
}

func (uc *UpdateBalanceUseCase) getBalanceRepository(ctx context.Context) gateway.BalanceGateway {
	repo, err := uc.Uow.GetRepository(ctx, "BalanceDB")
	if err != nil {
		panic(err)
	}
	return repo.(gateway.BalanceGateway)
}
