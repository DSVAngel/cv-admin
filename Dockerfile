FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=builder /app/dist/cv-admin /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
