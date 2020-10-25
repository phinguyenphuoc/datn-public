FROM node:9.6.1

# Node base template
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY public /app/public
COPY scripts /app/scripts
COPY package.json /app/package.json
#COPY package-lock.json /app/package.lock.json
COPY src /app/src

ARG STRIPE_PK
ENV REACT_APP_STRIPE_PK=$STRIPE_PK
ARG ZOOM_CLIENT_ID
ENV REACT_APP_ZOOM_CLIENT_ID=$ZOOM_CLIENT_ID
ARG DOMAIN_URL
ENV REACT_APP_DOMAIN_URL=$DOMAIN_URL
ARG GA_TRACKING_ID
ENV REACT_APP_GA_TRACKING_ID=$GA_TRACKING_ID
ARG HJID
ENV REACT_APP_HJID=$HJID
ARG HJSV
ENV REACT_APP_HJSV=$HJSV
ARG HJENABLED
ENV REACT_APP_HJENABLED=$HJENABLED

RUN npm install
RUN yarn global add serve
RUN yarn build

EXPOSE 80

# Main command
ENTRYPOINT ["./scripts/frontend_entrypoint.sh"]
CMD ["npm", "run", "start-prod"]
