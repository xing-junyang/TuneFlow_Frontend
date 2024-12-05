# 使用 Node.js 22 官方镜像（带 Alpine 版本）
FROM node:22-alpine

# 创建工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml（如果有）
COPY package*.json pnpm-lock.yaml* ./

# 安装项目依赖
RUN pnpm install

# 复制项目的全部文件
COPY . .

# 暴露端口8080
EXPOSE 8080

# 启动 Vue 应用
CMD ["npm", "run", "serve"]
