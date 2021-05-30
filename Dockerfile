FROM node:14-alpine3.13

# Common OS packages
RUN apk update && \
    apk upgrade && \
    apk add git && \
    apk add openssh
# for azure-iot-explorer
RUN apk add curl g++ make python2 

# Common Node.js packages
RUN npm install -g npm
# for azure-iot-explorer
#RUN npm install -g ...

# Environment Arguments
ENV PROJECT_ROOTDIR /app/
WORKDIR ${PROJECT_ROOTDIR}

# Constructs dependencies
COPY package*.json ${PROJECT_ROOTDIR}
RUN NODE_ENV=development npm install

# Copy ALL files
COPY . ${PROJECT_ROOTDIR}
RUN npm run build
