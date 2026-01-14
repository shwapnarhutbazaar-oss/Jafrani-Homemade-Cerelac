FROM node:18-alpine
WORKDIR /app

# ফাইলগুলো কপি এবং ইনস্টল করা
COPY package*.json ./
RUN npm install
COPY . .

# সার্ভার রান করা
EXPOSE 10000
CMD ["npm", "start"]
