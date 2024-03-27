FROM busybox
ADD dist/* /web
ENTRYPOINT ["cp", "-f", "/web/*", "/share/"]