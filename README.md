yunin-cli是云英的前端脚手架工具，初衷是为解决从已有项目中剥离基础模较为繁琐的问题。

脚手架处理流程如下：
1. 上传模板到git仓库，模板就是你从项目中剥离的基础模块
2. 添加模板到脚手架
3. 执行init，拉取选择的模板到本地

### Usage

```bash
# step 1
yarn global add @luwuer/yunin-cli

# step 2
yunin <command>
```

### Command

- `init`   初始项目
- `list`   查看已有模板
- `add`    [本地]添加模板
- `remove` [本地]删除模板

> 由于没有服务器，`add` && `remove`只支持本地添加和删除模板。
> 如果需要上传远程模板，可以在[github](https://github.com/luwuer/yunin-cli)提Pull Request，或者联系邮箱`html6@foxmail.com`

### Dependencies

- [commander](https://github.com/tj/commander.js) 处理命令行输入
- [inquirer](https://github.com/SBoudrias/Inquirer.js) 命令行输出提示信息让用户分布输入信息，支持多种输入类型
- [chalk](https://github.com/chalk/chalk) 命令行输出彩色提示信息
- [cli-spinner](https://www.npmjs.com/package/cli-spinner) 命令行加载动画
- [glob](https://www.npmjs.com/package/glob) 支持正则匹配文件