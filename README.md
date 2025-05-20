# 基于跨模态检索的网络交易风险信息检索工具--前端

基于跨模态检索的网络交易风险信息检索工具的前端，用Vue和ElementUI开发。<br />

基于跨模态检索的网络交易风险信息检索工具主要是针对网络违法交易行为的跨模态检索需求，设计并实现了一种结合语义向量检索与OCR识别的方法，能够高效处理包含大量文字描述的图像数据，实现跨模态的图文检索，并利用大语言模型（LLM）生成高质量文本的能力，生成图片描述，从而提升检索模型精度。



<br />

<p align="center">
  <a href="https://github.com/shaojintian/Best_README_template/">
    <img src="src/static/首页.png" alt="Logo" width="100%" height="100%">
  </a>

</p>



## 目录

- [上手指南](#上手指南)
  - [开发前的配置要求](#开发前的配置要求)
  - [安装步骤](#安装步骤)
- [文件目录说明](#文件目录说明)
- [项目部署与运行](#项目部署与运行)
- [使用到的框架](#使用到的框架)
- [作者](#作者)


### 上手指南

请确保您的电脑上已安装Node.js和npm



###### 开发前的配置要求

1. Node.js
2. npm


###### **安装步骤**

1. 根据[教程](https://nodejs.cn/npm/getting-started/configuring-your-local-environment/downloading-and-installing-node-js-and-npm/) 安装Node.js和npm
2. Clone the repo

```sh
git clone https://github.com/huangxixiyiqi/retrieval_demo
```

### 文件目录说明


```
filetree 
├── /public/
├── /src/
│  │  ├── assets/
│  │  └── components/
│  │  └── config/
│  │  └── router/
│  │  └── static/
│  │  └── App.vue
│  │  └── main.js
├── babel.config.js
├── README.md
├── jsconfig.json
├── package-lock.json
├── package.json
├── vue.config.js
```


### 项目部署与运行

#### Project setup
```
npm install
```

##### Compiles and hot-reloads for development
```
npm run serve
```

##### Compiles and minifies for production
```
npm run build
```

##### Lints and fixes files
```
npm run lint
```


### 使用到的框架

- [Vue](https://vuejs.org/)
- [ElementUI](https://element.eleme.cn/#/zh-CN)






### 作者

huangxixi



