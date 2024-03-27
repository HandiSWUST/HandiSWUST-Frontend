FROM busybox
ADD dist/* /web
ENTRYPOINT ["tail", "-f", "/dev/null"]