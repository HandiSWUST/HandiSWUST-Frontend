FROM busybox
ADD dist/* /web
ENTRYPOINT ["cp", "-f", "-r", "/web/", "/share/"]