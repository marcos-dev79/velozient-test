FROM golang:1.18

WORKDIR /go/src/app
COPY . .

#RUN go mod tidy
RUN go install velozient
RUN go test -v

CMD ["velozient"]