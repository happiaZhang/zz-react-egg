#使用基础镜像
From registry01.cloud.wanda.cn:8081/node:8.1.3

#创建目录，并且指定工作目录
RUN mkdir -p /user/src/app
WORKDIR /user/src/app

#将当前目录所有文件复制到工作目录
COPY . /user/src/app

#使用npm安装依赖包
#RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN npm install --production

#映射7001端口
EXPOSE  7001
COPY ./entrypoint.sh /

ENTRYPOINT ["bash"]
CMD ["/entrypoint.sh"]
