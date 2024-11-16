# Usa una imagen base de Node.js
FROM node

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de tu proyecto al contenedor
COPY . .

RUN npm install

# Exponer el puerto en el que corre tu app
EXPOSE 3000

# Inicia tu aplicación
CMD ["npm", "run", "start"]
