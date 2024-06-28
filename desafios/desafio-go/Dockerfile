FROM golang:alpine as builder

WORKDIR /app

COPY .. .

RUN go build --trimpath main.go

FROM scratch

COPY --from=builder /app .

CMD ["/main"]