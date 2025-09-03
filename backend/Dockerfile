FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 4000

CMD ["npm", "start"]