FROM node:0.12.2-onbuild

RUN npm install -g ember-cli@0.2.4 bower phantomjs

CMD ember server
