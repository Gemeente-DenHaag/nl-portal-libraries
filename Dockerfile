#############################
# 		"npm" stage	 		#
#############################
# The base stage for all our stages

FROM node AS nl_portal
#ENV NPM_CONFIG_LOGLEVEL info

WORKDIR /home/node/app

COPY package.json ./
COPY lerna.json ./
COPY packages packages/

# install and build
RUN npm install --global lerna; \
    npm install; \
    yarn build; \
    yarn storybook; \
RUN npm start
