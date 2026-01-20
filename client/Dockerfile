# client/Dockerfile
ARG VITE_BACKEND_URL=http://localhost:5000

# Stage 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /app

COPY client/package*.json ./
RUN npm install

COPY client/ .

ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
