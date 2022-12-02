<template>
	<div id="about">
		<van-collapse v-model="activeNames">
			<van-nav-bar id="bar" title="关于" left-text="返回" left-arrow @click-left="goBack"/>
			  <van-collapse-item title="作者">
				  <p>全栈 (排名不分先后，出BUG可通过下面方式联系): </p>
				  <p>卓计2101 Alice-in-oven: QQ 1071142396</p>
				  <p>计科2101 ShirakawaTyu: QQ 2541028866</p>
			  </van-collapse-item>
			  <van-collapse-item title="隐私协议">
				  <textarea id="privacy" rows="20" readonly>
# 隐私协议
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

c) 我们的服务器将会获取您的课表、考试、成绩等信息，但不会将其进行存储

### 隐私策略的变动

如果我们需要改变平台的隐私策略, 我们会把相关的改动在此页面发布, 以便您能随时了解我们会收集什么信息, 我们可能会如何使用这些信息以及我们是否会把此信息透露给第三方.

### 其他问题
在本协议中未声明的其他一切权利，仍归本团队所有。本网站信息由程序自动收集和处理，若您因为网站向您响应的信息不正确导致损失，我们概不负责。本团队保留对本协议的最终解释权利。

				  </textarea>
			  </van-collapse-item>
      <van-collapse-item title="更新日志">
        <textarea id="privacy" rows="20" readonly>
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
        </textarea>
      </van-collapse-item>
      <van-collapse-item title="主要借物表">
        <textarea id="privacy" rows="20" readonly>
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
        </textarea>
      </van-collapse-item>
      <van-collapse-item title="Github">
        <p>Web前端代码: https://github.com/flben233/HandiSWUST</p>
        <p>Android端代码: https://github.com/flben233/HandiSWUST-Android-Rebuild</p>
      </van-collapse-item>
      <van-collapse-item title="投喂作者们">
        投喂的收入将用于服务器维护<br>
        （以及作者们的日常开销）
        <van-image src="/payCode.JPG"></van-image>
        <van-image src="/payZ.JPG"></van-image>
      </van-collapse-item>
		</van-collapse>
	</div>
</template>

<script>
import {save, test} from "@/api/pushApi";
  import {Toast} from "vant";

  export default {
		name: "aboutUs",
		data() {
			return {
				activeNames: ["1", "2", "3", "5", "6"],
			}
		},
		methods: {
			goBack: function() {
				this.$router.push("/");
			},
		}
	}
</script>

<style scoped>
  #bar {
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05), 0 2px 6px 0 rgba(0, 0, 0, 0.05);
  }
	#about {
		position: relative;
		background-color: #f2f2f2;
		width: 100%;
		height: 100%;
    overflow-y: auto;
	}
	#privacy {
		width: 100%;
		resize: none;
	}
</style>