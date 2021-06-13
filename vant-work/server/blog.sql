# Host: 139.224.217.178  (Version 5.7.34)
# Date: 2021-06-13 22:24:02
# Generator: MySQL-Front 6.1  (Build 1.26)


#
# Structure for table "blogInfo"
#

CREATE TABLE `blogInfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '需求id',
  `userId` varchar(255) DEFAULT NULL COMMENT '需求发布绑定的用户id',
  `name` varchar(255) DEFAULT NULL COMMENT '需求名称',
  `time` varchar(255) DEFAULT NULL COMMENT '创建时间',
  `updateTime` varchar(255) DEFAULT NULL COMMENT '更新时间',
  `userName` varchar(255) DEFAULT NULL COMMENT '创建者姓名',
  `imageUrl` varchar(255) DEFAULT NULL,
  `descc` varchar(255) DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

#
# Data for table "blogInfo"
#

INSERT INTO `blogInfo` VALUES (12,'11','数据挖掘','2021-04-10 15:23','2021-04-10 15:26',NULL,'https://img-bss.csdn.net/1623208817356.png','111','111'),(13,'12','架构师','2021-04-10 15:26','2021-04-10 17:09',NULL,'https://img-bss.csdn.net/1623208817356.png','222','333'),(18,'14','web前端','2021-04-10 21:26','2021-04-10 21:27','111','https://img-bss.csdn.net/1623208817356.png','2333','445'),(19,'11','高明丽','2021-04-21 00:09',NULL,'叶贻福','https://img-bss.csdn.net/1623208817356.png','44','5'),(22,'11','122121212','2021-06-10 21:14',NULL,'叶贻福','https://www.qianxunzhe.cn//public/b7201ff8-ad35-46f6-b59d-b6e8b62dab03.png','12121212','23232323'),(23,'11','121212','2021-06-10 21:16',NULL,'叶贻福','https://www.qianxunzhe.cn//public/14ac0dc9-11f4-4b9e-b5e8-ffddf030ad26.png','212','W3School 的隐私声明\n下面的声明是 W3School 的隐私保护制度：\n\n不搜集用户个人信息\nIP 地址仅用于统计\n不与第三方分享统计报告\n安全措施防止敏感信息的误用\n不使用 Cookie 跟踪任何个人信息\n个人用户信息\nW3School 不搜集有关用户或访问者的任何个人信息。\n\n无需任何注册，用户即可自由访问 W3School 的任何页面。\n\n日志文件\nW3School 使用 IP 地址来诊断服务器问题、分析趋势、管理站点以及搜集统计信息。\n\nIP 地址不会关联个人可辨识信息。\n\nW3School 不会与第三方共享统计报告。该信息也不会标识任何单独的个人。\n\nW3School 在防止敏感信息丢失或误用方面拥有标准的安全措施。'),(24,'12','叶贻福','2021-06-10 22:54',NULL,'高明丽','https://www.qianxunzhe.cn//public/3ff1d32a-f71b-4771-8b96-d1684e29830d.png','11111','11111111111'),(25,'19','叶贻福','2021-06-11 00:35',NULL,'','https://www.qianxunzhe.cn//public/3bc701e2-ed71-4862-a9f6-fd4f1eaacc45.png','121212','121212121212');

#
# Structure for table "userInfo"
#

CREATE TABLE `userInfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(255) DEFAULT NULL COMMENT '账号',
  `pwd` varchar(255) DEFAULT NULL COMMENT '密码',
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `sex` varchar(255) DEFAULT NULL COMMENT '性别',
  `briday` varchar(255) DEFAULT NULL COMMENT '出生年月',
  `NativePlace` varchar(255) DEFAULT NULL COMMENT '籍贯',
  `qqNum` varchar(255) DEFAULT NULL COMMENT 'QQ号',
  `school` varchar(255) DEFAULT NULL COMMENT '学校',
  `education` varchar(255) DEFAULT NULL COMMENT '学历',
  `major` varchar(255) DEFAULT NULL COMMENT '专业',
  `remark` varchar(255) DEFAULT NULL COMMENT '自我描述',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `content` text,
  `headpic` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

#
# Data for table "userInfo"
#

INSERT INTO `userInfo` VALUES (11,'18133626045','123456','212','男','2019-09-01','安徽','1437552152','安徽新华学院','本科','通信工程',NULL,'21212','23232323121221212','https://www.qianxunzhe.cn//public/ae1e5853-105b-4003-96da-fc8b77e19b54.png'),(12,'15556939150','123456','高明丽','女','2020-12-24','安徽','1437552152','新华学院','本科','通信工程',NULL,'14375222222@qq.com','12121212','https://www.qianxunzhe.cn//public/e2c33292-ce76-4ea8-b79b-4ed76b33d2a0.png'),(13,'18133626046','123456',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'111','123456','yuan','男','2001-03-12','辽宁省','','','','',NULL,'',NULL,NULL),(15,'15556935151','123456',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,'222','123456',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,'999','999999',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,'2232323','1234562323',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,'15559885652','123456',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
