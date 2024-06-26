FROM caddy
ADD dist /swust
COPY Caddyfile /etc/caddy/Caddyfile