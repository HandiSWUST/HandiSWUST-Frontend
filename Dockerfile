FROM busybox
ADD dist/* /web
ENTRYPOINT ["echo", "'HandiSWUST-Frontend Started.'", "&&", "tail", "-F", "/dev/null"]