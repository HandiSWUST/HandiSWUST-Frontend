FROM busybox
ADD dist/* /
ENTRYPOINT ["echo", "'HandiSWUST-Frontend Started.'"]