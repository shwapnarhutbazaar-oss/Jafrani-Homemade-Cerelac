FROM node:18-alpine
WORKDIR /app
RUN echo "const http = require('http'); http.createServer((req, res) => { res.writeHead(200); res.end('GTM Server is Running'); }).listen(process.env.PORT || 10000);" > server.js
ENV PORT=10000
CMD ["node", "server.js"]
