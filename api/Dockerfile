FROM mhart/alpine-node:10.22.0
WORKDIR /api
COPY package*.json /api/
RUN npm install
COPY . /api/
EXPOSE 80
CMD ["npm", "start"]