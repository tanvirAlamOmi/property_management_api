FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install --save-dev ts-node
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main"]