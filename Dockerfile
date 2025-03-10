FROM node:22-alpine
EXPOSE 4200 7020
WORKDIR /app
COPY . .
RUN apk add --no-cache bash

SHELL ["/bin/bash", "-Eo", "pipefail", "-c"]
RUN yarn install

CMD ["bash", "run.sh"]
