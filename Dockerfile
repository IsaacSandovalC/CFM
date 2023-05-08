# Usando la imagen de node 18.12.1-alpine
FROM node:18.12.1-alpine

# Creando el directorio de trabajo
RUN mkdir -p /app

# Estableciendo el directorio de trabajo
WORKDIR /app

# Copiando el package.json y el package-lock.json
COPY package.json /app
COPY package-lock.json /app

# Instalando las dependencias
RUN yarn install

# Copiando el resto de los archivos
COPY . /app

# Compilando la aplicación
# RUN yarn build

CMD [ "yarn" "dev" "start"]
