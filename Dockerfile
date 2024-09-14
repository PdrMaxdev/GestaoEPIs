# Usar uma imagem base do Nginx para servir arquivos estáticos
FROM nginx:alpine

# Remover configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar o arquivo de configuração personalizado do Nginx
COPY nginx.conf /etc/nginx/conf.d/

# Copiar os arquivos do projeto para o diretório de conteúdo do Nginx
COPY . /usr/share/nginx/html

# Expor a porta 80 para acesso HTTP
EXPOSE 80
