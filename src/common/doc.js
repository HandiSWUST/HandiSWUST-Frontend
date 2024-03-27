
export const UPDATE_LOG =
    "# 2024.3.20\n" +
    "- 增加了手动刷新课表的选项\n" +
    "- 实验课添加课程名显示\n" +
    "- 后端无状态化+更换底层请求客户端=性能大幅提升"+
    "# 2024.2.26\n" +
    "- 整理代码\n" +
    "- 修复一言API\n" +
    "# 2023.8.8\n" +
    "- 更新vite以避免CVE-2023-34092\n" +
    "- 课表加入左右滑动切换周\n" +
    "- VantUI升级至4.16\n" +
    "# 2023.6.11\n" +
    "- 后端增加熔断机制，确保上游离线时快速失败\n" +
    "- 修复了含英文学号无法使用课表的问题\n" +
    "- 前端增加验证码获取失败提示\n" +
    "# 2023.6.2\n" +
    "- 后端升级至Spring Boot 3.1\n" +
    "- 后端代码架构优化完成\n" +
    "# 2023.5.24\n" +
    "- 修复了考试缓存不正常的问题\n" +
    "# 2023.5.22\n" +
    "- 应用页增加了对分易未完成作业查看的功能\n" +
    "# 2023.5.16\n" +
    "- 增加了验证码自动识别功能\n" +
    "# 2023.4.16\n" +
    "- 修改了查成绩页面的样式\n" +
    "- 修改了导航栏隐藏的策略\n" +
    "# 2023.4.13\n" +
    "- 增加了扩展组件的能力\n" +
    "- 添加了ChatGPT和MikuTap作为测试\n" +
    "# 2023.3.11\n" +
    "- 经过了长时间准备，迁移至更加规范的V2版Api\n" +
    "# 2022.1.1 - 2022.2.20\n" +
    "- 修复了放假时课表请求异常的问题\n" +
    "- 增加了应用页，未来计划上线chatgpt聊天功能并允许同学们提交网页应用\n" +
    "- 更新了课表请求接口\n" +
    "- 由于学校频繁更换目前课表请求使用了简易版故障转移\n" +
    "- QQ推送页面现在可以知道自己是否开启该功能\n" +
    "- 更新hutool以避免CVE-2023-24162漏洞影响\n" +
    "- 增加了获取学期信息的接口\n" +
    "- 修复了成绩可能导致的空指针问题\n" +
    "# 2022.12.6\n" +
    "- 修复了一站式登录接口正常但一站式大厅崩溃的情况下登录失败的问题\n" +
    "# 2022.12.3\n" +
    "- 修复了QQ推送课程不自动更新的问题\n" +
    "# 2022.11.26\n" +
    "- 悄咪咪加了个测试中的课程推送服务\n" +
    "# 2022.11.24\n" +
    "- 优化了异常跳转\n" +
    "# 2022.11.10\n" +
    "- 课表和考试加入了本地缓存，要是一站式寄了也不用慌了\n" +
    "# 2022.11.9\n" +
    "- 课表添加了星期高亮，考试去掉了最后一行考试地点\n" +
    "# 2022.11.7\n" +
    "- 修复了课程表返回空数据的BUG\n" +
    "# 2022.11.5\n" +
    "- 更新考试查询功能\n" +
    "# 2022.11.1\n" +
    "- 修改了课程表颜色\n" +
    "- 细微调整了课程表加载逻辑\n" +
    "# 2022.10.30\n" +
    "- 添加了过渡动画\n" +
    "# 2022.10.25\n" +
    "- 修改了首页样式，这大概是我作为后端的极限了罢，如果还丑那下次请个专门搞设计的来弄弄看看\n" +
    "# 2022.10.24\n" +
    "- 修复了鸿蒙以及低版本安卓闪退的问题\n" +
    "# 2022.10.23\n" +
    "- 增加了课程表安卓小部件\n" +
    "- 调整了部分页面的样式\n" +
    "# 2022.10.22\n" +
    "- 调整了登录过期的时间\n" +
    "# 2022.10.19\n" +
    "- 修复了部分课程null的问题\n" +
    "# 2022.10.15\n" +
    "- 修复了IOS周数显示不正确的问题\n" +
    "# 2022.10.12\n" +
    "- 增加了图书查询功能\n" +
    "# 2022.10.10\n" +
    "- 尝试修复了串数据的问题\n" +
    "# 2022.10.9\n" +
    "- 加入绩点查询功能\n" +
    "- 后端增加每日登录人次统计(不记录具体的学号等信息，只记录次数)\n" +
    "# 2022.10.8\n" +
    "- 加入课程表选周功能\n" +
    "- 加入课程表当周离线缓存\n" +
    "- 加入图书借阅记录查询\n" +
    "- 后端代码优化\n" +
    "- 修复了若干BUG\n" +
    "- 密码不再使用cookie存储\n" +
    "- 修改了关于页面\n" +
    "# 2022.10.7\n" +
    "- 增加了校历展示\n" +
    "- 修复大量BUG\n" +
    "# 2022.10.6\n" +
    "- 增加了登录状态判断\n" +
    "# 2022.10.4\n" +
    "- 增加成绩查询功能\n" +
    "- 修复了无法退出登录的问题\n" +
    "# 2022.10.3\n" +
    "- alice-in-oven加入\n" +
    "- 增加关于页面以及隐私协议\n" +
    "# 2022.10.2\n" +
    "- 课程表终于基本成型，泪目\n" +
    "- 增加了记住密码\n" +
    "- 增加了获取当前周数\n" +
    "# 2022.10.1\n" +
    "- 首次提交，实现了登录和基本的首页";
/*
# 2024.2.26
- 整理代码
- 修复一言API
# 2023.8.8
- 更新vite以避免CVE-2023-34092
- 课表加入左右滑动切换周
- VantUI升级至4.16
# 2023.6.11
- 后端增加熔断机制，确保上游离线时快速失败
- 修复了含英文学号无法使用课表的问题
- 前端增加验证码获取失败提示
# 2023.6.2
- 后端升级至Spring Boot 3.1
- 后端代码架构优化完成
# 2023.5.24
- 修复了考试缓存不正常的问题
# 2023.5.22
- 应用页增加了对分易未完成作业查看的功能
# 2023.5.16
- 增加了验证码自动识别功能
# 2023.4.16
- 修改了查成绩页面的样式
- 修改了导航栏隐藏的策略
# 2023.4.13
- 增加了扩展组件的能力
- 添加了ChatGPT和MikuTap作为测试
# 2023.3.11
- 经过了长时间准备，迁移至更加规范的V2版Api
# 2022.1.1 - 2022.2.20
- 修复了放假时课表请求异常的问题
- 增加了应用页，未来计划上线chatgpt聊天功能并允许同学们提交网页应用
- 更新了课表请求接口
- 由于学校频繁更换目前课表请求使用了简易版故障转移
- QQ推送页面现在可以知道自己是否开启该功能
- 更新hutool以避免CVE-2023-24162漏洞影响
- 增加了获取学期信息的接口
- 修复了成绩可能导致的空指针问题
# 2022.12.6
- 修复了一站式登录接口正常但一站式大厅崩溃的情况下登录失败的问题
# 2022.12.3
- 修复了QQ推送课程不自动更新的问题
# 2022.11.26
- 悄咪咪加了个测试中的课程推送服务
# 2022.11.24
- 优化了异常跳转
# 2022.11.10
- 课表和考试加入了本地缓存，要是一站式寄了也不用慌了
# 2022.11.9
- 课表添加了星期高亮，考试去掉了最后一行考试地点
# 2022.11.7
- 修复了课程表返回空数据的BUG
# 2022.11.5
- 更新考试查询功能
# 2022.11.1
- 修改了课程表颜色
- 细微调整了课程表加载逻辑
# 2022.10.30
- 添加了过渡动画
# 2022.10.25
- 修改了首页样式，这大概是我作为后端的极限了罢，如果还丑那下次请个专门搞设计的来弄弄看看
# 2022.10.24
- 修复了鸿蒙以及低版本安卓闪退的问题
# 2022.10.23
- 增加了课程表安卓小部件
- 调整了部分页面的样式
# 2022.10.22
- 调整了登录过期的时间
# 2022.10.19
- 修复了部分课程null的问题
# 2022.10.15
- 修复了IOS周数显示不正确的问题
# 2022.10.12
- 增加了图书查询功能
# 2022.10.10
- 尝试修复了串数据的问题
# 2022.10.9
- 加入绩点查询功能
- 后端增加每日登录人次统计(不记录具体的学号等信息，只记录次数)
# 2022.10.8
- 加入课程表选周功能
- 加入课程表当周离线缓存
- 加入图书借阅记录查询
- 后端代码优化
- 修复了若干BUG
- 密码不再使用cookie存储
- 修改了关于页面
# 2022.10.7
- 增加了校历展示
- 修复大量BUG
# 2022.10.6
- 增加了登录状态判断
# 2022.10.4
- 增加成绩查询功能
- 修复了无法退出登录的问题
# 2022.10.3
- alice-in-oven加入
- 增加关于页面以及隐私协议
# 2022.10.2
- 课程表终于基本成型，泪目
- 增加了记住密码
- 增加了获取当前周数
# 2022.10.1
- 首次提交，实现了登录和基本的首页
*/

export const OPEN_SOURCE = "# 图标\n" +
    "- Bitsies! https://iconstore.co/icons/bitsies\n" +
    "# 一言Api\n" +
    "- Hitokoto https://hitokoto.cn/\n" +
    "# 组件库\n" +
    "- Vant3 https://vant-contrib.gitee.io/vant/v3/#/zh-CN\n" +
    "# Web服务器\n" +
    "- Caddy2 https://github.com/caddyserver/caddy\n" +
    "# 后端开发框架\n" +
    "- SpringBoot https://spring.io/projects/spring-boot\n" +
    "# QQ机器人\n" +
    "- Mirai https://github.com/mamoe/mirai\n" +
    "# JSON\n" +
    "- FastJSON2 https://github.com/alibaba/fastjson2\n" +
    "# ORM框架\n" +
    "- Mybatis-Plus https://github.com/baomidou/mybatis-plus\n" +
    "# 好用的工具库\n" +
    "- Hutool https://github.com/dromara/hutool\n" +
    "- Jsoup https://github.com/jhy/jsoup/\n" +
    "# 数据库\n" +
    "- MySQL https://www.mysql.com\n" +
    "- Redis https://github.com/redis/redis"

/*
# 图标
- Bitsies! https://iconstore.co/icons/bitsies
# 一言Api
- Hitokoto https://hitokoto.cn/
# 组件库
- Vant3 https://vant-contrib.gitee.io/vant/v3/#/zh-CN
# Web服务器
- Caddy2 https://github.com/caddyserver/caddy
# 后端开发框架
- SpringBoot https://spring.io/projects/spring-boot
# QQ机器人
- Mirai https://github.com/mamoe/mirai
# JSON
- FastJSON2 https://github.com/alibaba/fastjson2
# ORM框架
- Mybatis-Plus https://github.com/baomidou/mybatis-plus
# 好用的工具库
- Hutool https://github.com/dromara/hutool
- Jsoup https://github.com/jhy/jsoup/
# 数据库
- MySQL https://www.mysql.com
- Redis https://github.com/redis/redis
*/

export const PRIVACY_POLICY = "# 掌上西科隐私协议\n" +
    "## 隐私协议：一般说明\n" +
    "本隐私策略的目的是说明当您访问和使用本网站时我们可能会搜集的资料, 我们会怎样使用这些资料, 是否会透露给第三方, 以及您对这些资料的使用及修改方面的选择权利. 本隐私策略适用于本网站,您需要仔细阅读本隐私策略.\n" +
    "\n" +
    "### 适用范围\n" +
    "a) 在您使用本网站时。\n" +
    "\n" +
    "### 信息的使用\n" +
    "a) 我们尊重您的隐私, 正常来说, 本网站会自动收集使用者的Cookies等内容. 这些内容可能包含可识别个人身份的信息\n" +
    "\n" +
    "b) 网站将可能使用 Cookies和本地存储 技术来增强您的浏览体验, 或是用于您的访问验证\n" +
    "\n" +
    "### 信息披露\n" +
    "a) 本软件只会在本地存储您的信息，除非特殊声明，否则我们的服务器不存储任何您的信息，也不会将您的信息在未经您同意的情况下披露给任何的第三方。\n" +
    "\n" +
    "### 信息存储和交换\n" +
    "您的信息和资料会被上传到云端服务器上，这些信息和资料不会被传送至您所在国家、地区或本软件收集信息和资料所在地的境外并在境外被访问、存储和展示。\n" +
    "\n" +
    "### 信息安全\n" +
    "a) 您的一站式认证账号密码将会在**前端**由**西南科技大学一站式认证服务器**下发的公钥**加密**后再传输至我们的服务器进行认证，我们的服务器**不会接触**到您的明文密码，并且**无法也不会**对密文进行解密\n" +
    "\n" +
    "b) 我们会在**本地**以**加密**的方式存储您的认证信息，但不会以任何形式上传至我们的服务器或第三方服务器，同时我们会尽最大努力保护您的信息不被泄露\n" +
    "\n" +
    "c) 我们的服务器将会获取您的课表、考试、成绩等信息，但不会将其进行长期存储\n" +
    "\n" +
    "### 隐私策略的变动\n" +
    "\n" +
    "如果我们需要改变平台的隐私策略, 我们会把相关的改动在此页面发布, 以便您能随时了解我们会收集什么信息, 我们可能会如何使用这些信息以及我们是否会把此信息透露给第三方.\n" +
    "\n" +
    "### 其他问题\n" +
    "在本协议中未声明的其他一切权利，仍归本团队所有。本网站信息由程序自动收集和处理，若您因为网站向您响应的信息不正确导致损失，我们概不负责。本团队保留对本协议的最终解释权利。"

/*
# 掌上西科隐私协议
## 隐私协议：一般说明
本隐私策略的目的是说明当您访问和使用本网站时我们可能会搜集的资料, 我们会怎样使用这些资料, 是否会透露给第三方, 以及您对这些资料的使用及修改方面的选择权利. 本隐私策略适用于本网站,您需要仔细阅读本隐私策略.

### 适用范围
a) 在您使用本网站时。

### 信息的使用
a) 我们尊重您的隐私, 正常来说, 本网站会自动收集使用者的Cookies等内容. 这些内容可能包含可识别个人身份的信息

b) 网站将可能使用 Cookies和本地存储 技术来增强您的浏览体验, 或是用于您的访问验证

### 信息披露
a) 本软件只会在本地存储您的信息，除非特殊声明，否则我们的服务器不存储任何您的信息，也不会将您的信息在未经您同意的情况下披露给任何的第三方。

### 信息存储和交换
您的信息和资料会被上传到云端服务器上，这些信息和资料不会被传送至您所在国家、地区或本软件收集信息和资料所在地的境外并在境外被访问、存储和展示。

### 信息安全
a) 您的一站式认证账号密码将会在**前端**由**西南科技大学一站式认证服务器**下发的公钥**加密**后再传输至我们的服务器进行认证，我们的服务器**不会接触**到您的明文密码，并且**无法也不会**对密文进行解密

b) 我们会在**本地**以**加密**的方式存储您的认证信息，但不会以任何形式上传至我们的服务器或第三方服务器，同时我们会尽最大努力保护您的信息不被泄露

c) 我们的服务器将会获取您的课表、考试、成绩等信息，但不会将其进行长期存储

### 隐私策略的变动

如果我们需要改变平台的隐私策略, 我们会把相关的改动在此页面发布, 以便您能随时了解我们会收集什么信息, 我们可能会如何使用这些信息以及我们是否会把此信息透露给第三方.

### 其他问题
在本协议中未声明的其他一切权利，仍归本团队所有。本网站信息由程序自动收集和处理，若您因为网站向您响应的信息不正确导致损失，我们概不负责。本团队保留对本协议的最终解释权利。
*/