# Mutlistage docker file for building and serving the Single Page App
# Build stage
FROM node:24-alpine as builder
LABEL maintainer="graham.david@epa.gov"
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build


# test
FROM builder as test
WORKDIR /app
CMD ["npm", "run", "test"]

# local development
FROM builder as dev
WORKDIR /app
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Production
FROM nginx:1.29-alpine-slim as production
WORKDIR /app
ENV NODE_ENV production
# copy build from builder stage
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
