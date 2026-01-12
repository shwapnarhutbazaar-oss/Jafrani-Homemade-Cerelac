FROM node:18-alpine
ENV PORT=10000
CMD ["node", "-e", "console.log('Server Live')"]
