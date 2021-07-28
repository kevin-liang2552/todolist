FROM mhart/alpine-node:14

RUN mkdir -p /var/app/current/src
WORKDIR /var/app/current
COPY *.json /var/app/current/
COPY src/. /var/app/current/src/
RUN npm install
RUN npm run build-all
RUN rm -rf /var/app/current/src
ENV NODE_ENV production
EXPOSE 9000

CMD node dist/index.js