# Pledge Bridge

### 项目 rope 地址

- https://github.com/pledge-defi/pledge-bridge-frontend

### 环境启动准备

```bash
yarn
```

```bash
yarn start
```

### 项目规范

- 一般的除了 React 组件 和 TS 类型使用大驼峰命名, 静态变量使用大写加下划线形式, 其他包括不限于(方法、文件名、变量命名)等都采用小驼峰命名,
- 项目采用了 `eslint`、`stylelint`、`prettier` 进行规范校验, [参考 umijs/fabric](https://github.com/umijs/fabric)
- 开启了 lint-staged,在每次 commit 时校验。
- `不要跳过lint-staged 检查`, `不要使用 --no-verify`

### 项目采用 TypeScript

- 尽可能的减少使用`any`, 写清楚具体的数据类型
- 尽可能的减少使用 `// @ts-ignore`, 跳过 ts 检查

### 项目技术架构

- React + TypeScript + Less + styledcomponets
- 采用 webpack 搭建, UI 库是 Ant-Design

### 项目接口字段调试方法

- 后端提供 swagger.json 文件, 使用转化工具 [@umijs/openapi](https://www.npmjs.com/package/@umijs/openapi)
- 将转化后的接口 Request、类型声明文件.d.ts、mock 文件分别复制到项目中
- `yarn start` 开启 mock 服务, 通过 mock 数据 前端可以闭环调试
