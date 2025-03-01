# Builder Image
FROM rust:1.85.0-alpine3.21 AS builder

WORKDIR /app

RUN apk add --no-cache \
    musl-dev \
    gcc \
    libc-dev \
    make \
    pkgconfig


COPY . .

RUN cargo build --release && \
    strip target/release/api

# Runtime Image
FROM alpine:3.21 AS runtime

WORKDIR /app
RUN apk add --no-cache libgcc
COPY --from=builder /app/target/release/api /app/api
RUN chmod +x /app/api

EXPOSE 3000
CMD ["/app/api"]