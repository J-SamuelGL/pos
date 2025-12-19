FROM node:22-alpine

# El hosting requiere ssh
RUN apk add --no-cache openssh-client sshpass

WORKDIR /home/app

COPY package*.json ./

RUN npm i

COPY . .
# Generate Prisma client
RUN npx prisma generate
RUN npm run build

# carpeta ssh
RUN mkdir -p /root/.ssh && chmod 700 /root/.ssh

EXPOSE 3000

# Script

RUN echo '#!/bin/sh' > /start.sh && \
    echo 'echo "Haciendo tunel..."' >> /start.sh && \
    echo 'ssh-keyscan -p $SSH_PORT $SSH_HOSTNAME >> /root/.ssh/known_hosts 2>/dev/null' >> /start.sh && \
    echo 'sshpass -p "$SSH_PASSWORD" ssh -f -N -L 3306:127.0.0.1:3306 -p $SSH_PORT $SSH_USERNAME@$SSH_HOSTNAME' >> /start.sh && \
    echo 'echo "Tunnel hecho. Esperando..."' >> /start.sh && \
    echo 'sleep 5' >> /start.sh && \
    echo 'echo "Haciendo configuracion de prisma..."' >> /start.sh && \
    echo 'npx prisma db pull' >> /start.sh && \
    echo 'npx prisma generate' >> /start.sh && \
    echo 'echo "Modelo obtenido!"' >> /start.sh && \
    echo 'echo "Iniciando app..."' >> /start.sh && \
    echo 'exec npm run start' >> /start.sh && \
    chmod +x /start.sh

CMD ["/start.sh"]
