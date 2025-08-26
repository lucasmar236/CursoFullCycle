package web

import (
	"balances/internal/usecase/get_balance"
	"encoding/json"
	"fmt"
	"github.com/go-chi/chi/v5"
	"net/http"
)

type WebBalanceHandler struct {
	GetBalanceUseCase get_balance.BalanceGetUseCase
}

func NewWebBalanceHandler(getBalanceUseCase get_balance.BalanceGetUseCase) *WebBalanceHandler {
	return &WebBalanceHandler{
		GetBalanceUseCase: getBalanceUseCase,
	}
}

func (h *WebBalanceHandler) GetBalance(w http.ResponseWriter, r *http.Request) {
	var dto get_balance.BalanceGetInputDTO
	dto.AccountID = chi.URLParam(r, "id")

	execute, err := h.GetBalanceUseCase.Execute(r.Context(), &dto)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Println(err)
		return
	}
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(execute)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

}
