FROM golang:1.20

WORKDIR /app/

RUN apt-get update && apt-get install -y librdkafka-dev

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o walletcore ./cmd/walletcore/main.go

CMD ["./walletcore"]