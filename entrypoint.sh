set -x


# Temp solution for k8s service name references in QA environment
if [ "$env" == "qa" ] ; then

        sed -i s/port\:\ 31489/port:\ 6379/ /user/src/app/config/config.prod.js
        sed -i s/host\:\ \'.*\'/host:\ \'redis-primary.infra\'/ /user/src/app/config/config.prod.js
fi
npm start

pid=`ps aux|grep start-cluster|grep node|awk '{print $2}'`

tail -n 1000 --pid=$pid  -f /root/logs/bss-icp-admin-node/*.log
