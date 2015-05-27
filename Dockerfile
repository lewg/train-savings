FROM node:0.12.4-onbuild

RUN npm install -g ember-cli@0.2.5 bower phantomjs
RUN bower install --allow-root

CMD ember server
