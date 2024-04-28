FROM nginx

# removes default ngnix config
RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf

# copies our custom nginx config
ADD ./default.conf /etc/nginx/conf.d/default.conf
ADD ./nginx.conf /etc/nginx/nginx.conf

RUN openssl dhparam -dsaparam -out /etc/ssl/certs/dhparam.pem 4096
