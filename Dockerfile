# Build stage
FROM golang:1.24-alpine AS builder

WORKDIR /app

# Copy go mod files dari folder backend
COPY backend/go.mod backend/go.sum ./
RUN go mod download

# Copy source code dari folder backend
COPY backend/ .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Run stage
FROM alpine:latest

WORKDIR /root/

# Copy the binary from builder
COPY --from=builder /app/main .
COPY --from=builder /app/.env.example ./.env

# Expose port
EXPOSE 8080

# Run the application
CMD ["./main"]
