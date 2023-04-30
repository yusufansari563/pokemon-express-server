FROM nginx:alpine

ADD . /app
WORKDIR /app
COPY ./proxy/default.conf /etc/nginx/conf.d/default.conf
COPY ./proxy/uwsgi_params /etc/nginx/uwsgi_params
COPY ./src/assets/images/ /etc/nginx/conf.d/images/
