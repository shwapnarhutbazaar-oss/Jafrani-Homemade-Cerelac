FROM node:18-slim
ENV PORT=10000
EXPOSE 10000
CMD ["node", "-e", "const http = require('http'); http.createServer((req, res) => { res.writeHead(200); res.end('GTM Server Live'); }).listen(process.env.PORT || 10000);"]
