FROM busybox
ADD dist /web
ADD run.sh run.sh
ENTRYPOINT ["sh", "run.sh"]