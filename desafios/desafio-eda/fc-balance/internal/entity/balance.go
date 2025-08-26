package entity

type Balance struct {
	AccountID string
	Balance   float64
}

func NewAccount(id string, balance float64) *Balance {
	account := &Balance{
		AccountID: id,
		Balance:   balance,
	}
	return account
}
