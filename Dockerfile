FROM gliderlabs/alpine:3.2

RUN apk-install nodejs
RUN npm install -g ember-cli@0.2.5 bower phantomjs

ADD . /usr/src/trainsavings
WORKDIR /usr/src/trainsavings

RUN npm install
RUN bower install --allow-root

CMD ember server
