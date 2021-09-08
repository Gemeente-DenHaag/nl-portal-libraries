# stage1 - build react app first 
FROM node:14-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json /app/
COPY ./yarn.lock /app/
COPY ./lerna.json /app/
COPY ./packages/app/package.json /app/packages/app/
COPY ./packages/authentication/package.json /app/packages/authentication/
COPY ./packages/localization/package.json /app/packages/localization/
COPY ./packages/user-interface/package.json /app/packages/user-interface/

RUN yarn global add lerna && yarn run bootstrap

COPY . /app
RUN yarn run build:dev

# stage 2 - build the final image and copy the react build files
FROM nginx:1.21.1-alpine
COPY --from=build /app/packages/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
# EXPOSE 80
# support running as arbitrary user which belogs to the root group
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
# users are not allowed to listen on priviliged ports
# RUN sed -i.bak 's/listen\(.*\)80;/listen 8081;/' /etc/nginx/conf.d/default.conf
# comment user directive as master process is run as user in OpenShift anyhow
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf
EXPOSE 8081
CMD ["nginx", "-g", "daemon off;"]