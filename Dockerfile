FROM nginx:1.15.3-alpine
COPY /Docker/default.conf /etc/nginx/conf.d/default.conf
COPY /dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# yarn build &&  docker build . -t d3web
# docker run -d -p 80:80 --restart unless-stopped d3web