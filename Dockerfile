
FROM node:22-alpine

LABEL org.opencontainers.image.source="https://github.com/jayasri-1805/CloudShip"
LABEL org.opencontainers.image.description="CloudShip application delivery automation"
LABEL org.opencontainers.image.licenses="MIT"

ENV NODE_ENV=production
WORKDIR /app


COPY package*.json ./
RUN npm ci --omit=dev \
    && rm -rf /usr/local/lib/node_modules/npm \
              /usr/local/bin/npm \
              /usr/local/bin/npx

COPY src ./src


EXPOSE 3000

USER node

CMD ["node", "src/server.js"]
