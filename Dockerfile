FROM alpine:latest
RUN apk add --no-cache curl
ENV PORT=10000
CMD ["sh", "-c", "while true; do echo 'GTM Server is running on port $PORT'; sleep 3600; done"]
