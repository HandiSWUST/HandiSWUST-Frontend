FROM scratch
ADD dist/* /
ENTRYPOINT ["echo", "'HandiSWUST-Frontend Started.'"]