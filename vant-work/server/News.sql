# Host: 139.224.217.178  (Version 5.7.34)
# Date: 2021-06-14 00:59:28
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

INSERT INTO `blogInfo` VALUES (12,'11','湖北省孝感市政协主席仇平贵被查，3天前在调研','2021-04-10 15:23','2021-04-10 15:26','叶一福','//n.sinaimg.cn/default/crawl/116/w550h366/20210611/392f-krhvrxt7544454.png','据湖北省纪委监委官网消息，孝感市政协党组书记、主席仇平贵涉嫌严重违纪违法，目前正接受湖北省纪委监委纪律审查和监察调查。','　仇平贵出生于1961年，长期在孝感市工作，曾任：孝感市民政局局长，孝南区委书记，市委副秘书长，副市长，市委常委、宣传部部长等职。\r\n\r\n　　2016年12月，仇平贵任孝感市政协党组书记，2017年1月起任孝感市政协党组书记、主席。\r\n\r\n　　在被宣布调查3天前，仇平贵还有公开活动。\r\n\r\n　　据孝感市政协官网消息，6月8日，市政协主席仇平贵到孝南区广场街道办事处熊咀社区调研党建引领基层治理工作和为民办实事项目进展情况。\r\n\r\n　　仇平贵简历\r\n\r\n　　仇平贵，男，汉族，1961年4月出生，湖北广水人，中央党校大学学历，1981年3月参加工作，1981年3月加入中国共产党。\r\n\r\n　　1993年12月至1998年12月，任安陆市政府副市长；'),(13,'11','国台办：符合接种条件的台胞可按有关政策来大陆接种疫苗','2021-04-10 15:23','2021-04-10 15:26','叶一福','//n.sinaimg.cn/default/crawl/50/w550h300/20210611/7941-krhvrxt7494287.png','　　有记者问，据台媒报道，因岛内疫苗严重短缺，近期有不少台胞希望能赴大陆接种疫苗，请问大陆方面对此持何态度？','马晓光指出，众所周知，疫苗是战胜疫情的保障。截至6月8日，大陆已接种新冠疫苗超过8亿剂次。世界卫生组织已将中国国药和中国科兴两种疫苗纳入全球“紧急使用清单”；大陆疫苗在90多个国家和地区获批上市或紧急使用，向全球供应超3.5亿剂，充分显示大陆疫苗具有良好安全性和保护力。岛内疫情持续蔓延，台湾民众生命健康和利益福祉日益受到威胁，尽快接种疫苗，是广大台湾同胞尽早摆脱疫情肆虐之苦有效的途径。岛内超过八成以上民众愿意接种大陆疫苗，也期盼尽快进口大陆疫苗，但民进党当局罔顾民意，漠视台湾同胞生命健康安危，始终把疫苗问题进行政治操作，编造种种借口阻挠台湾同胞用上大陆疫苗，不得人心。\r\n\r\n　　马晓光表示，我们十分理解台湾同胞为维护自身生命健康安全迫切希望尽早接种大陆疫苗的心情，愿意尽最大努力提供帮助。对搭乘民航客运航班来大陆的台胞，只要符合接种条件，可在严格执行入境防疫规定（包括登机前和抵达后）、自愿和知情同意前提下，按有关政策在大陆接种疫苗。据不完全统计，截至5月31日，在大陆接种疫苗的台胞已达6.2万人。\r\n\r\n　　马晓光说，奉劝民进党当局认真倾听岛内各界和百姓呼声，尽早拆除大陆疫苗输台的人为障碍，让广大台湾同胞早日就地接种安全高效的大陆疫苗。');

#
# Structure for table "Instructions"
#

CREATE TABLE `Instructions` (
  `id` int(11) DEFAULT NULL,
  `content` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "Instructions"
#

INSERT INTO `Instructions` VALUES (1,'知识产权声明\r\n百度拥有本网站内所有资料的版权，各分频道权利声明有特殊规定的，从其规定。任何被授权的浏览、复制、打印和传播属于本网站内的资料必须符合以下条件：\r\n\r\n所有的资料和图象均以获得信息为目的；\r\n所有的资料和图象均不得用于商业目的；\r\n所有的资料、图象及其任何部分都必须包括此版权声明；\r\n本网站（www.baidu.com）所有的产品、技术与所有程序均属于百度知识产权，在此并未授权。“Baidu”、 “百度”及相关图形等为百度的注册商标。\r\n\r\n未经百度许可，任何人不得擅自（包括但不限于：以非法的方式复制、传播、展示、镜像、上载、下载）使用，或通过非常规方式（如：恶意干预百度数据）影响百度的正常服务，任何人不得擅自以软件程序自动获得百度数据。否则，百度将依法追究法律责任。');

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
