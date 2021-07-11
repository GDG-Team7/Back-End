FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x docker-entrypoint.sh 
ENTRYPOINT ["sh","/app/docker-entrypoint.sh"]

EXPOSE 5000