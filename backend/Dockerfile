FROM node:20.13.1
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci --only=production
USER node
EXPOSE 3004
CMD ["node", "app.js"]
