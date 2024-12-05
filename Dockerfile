# 使用 Node.js 官方镜像
FROM node:16-alpine

# 创建工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目的全部文件
COPY . .

# 暴露端口8080
EXPOSE 8080

# 启动Vue应用
CMD ["npm", "run", "serve"]

