# Use official Node.js image
FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 8081
CMD ["node", "index.js"]
