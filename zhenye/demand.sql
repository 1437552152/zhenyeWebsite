# Host: 47.107.180.202  (Version 5.7.24)
# Date: 2021-06-13 22:04:22
# Generator: MySQL-Front 6.1  (Build 1.26)


#
# Structure for table "demandInfo"
#

CREATE TABLE `demandInfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '需求id',
  `userId` varchar(255) DEFAULT NULL COMMENT '需求发布绑定的用户id',
  `demandType` varchar(255) DEFAULT NULL COMMENT '需求类别',
  `name` varchar(255) DEFAULT NULL COMMENT '需求名称',
  `demandAble` varchar(255) DEFAULT NULL COMMENT '需求能力',
  `jobXZ` varchar(255) DEFAULT NULL COMMENT '工作性质',
  `jobZZMin` varchar(255) DEFAULT NULL COMMENT '报酬最小值',
  `jobZZMax` varchar(255) DEFAULT NULL COMMENT '薪资最大值',
  `address` varchar(255) DEFAULT NULL COMMENT '合作地点',
  `hzjy` varchar(255) DEFAULT NULL COMMENT '合作经验',
  `xlyq` varchar(255) DEFAULT NULL COMMENT '学历要求',
  `xqyh` varchar(255) DEFAULT NULL COMMENT '需求诱惑',
  `xqms` varchar(255) DEFAULT NULL COMMENT '需求描述',
  `hzdz` varchar(255) DEFAULT NULL COMMENT '合作地址',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '职位状态  0表示已发布   1.表示已报名，未审核   2.表示审核通过    3.表示审核不通过   4.需求对接成功   5.需求对接失败',
  `recipientUserId` int(11) DEFAULT NULL COMMENT '需求接收者的用户id',
  `time` varchar(255) DEFAULT NULL COMMENT '创建时间',
  `updateTime` varchar(255) DEFAULT NULL COMMENT '更新时间',
  `userName` varchar(255) DEFAULT NULL COMMENT '创建者姓名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

#
# Data for table "demandInfo"
#

INSERT INTO `demandInfo` VALUES (12,'11','后端开发','数据挖掘','具有大数据思维，会爬虫等技术','全职','12','14','安徽大学','5-10年','博士','五险一金，年假100天','1、负责网络组网规划、前期设备选型，后期对服务器、主机、应用系统的日常监控和维护，保障服务器、主机和应用正常、稳定的运行；\r\n2、掌握常用交换机和路由器配置，熟悉网络协议和网络故障排查；\r\n3、熟练配置和使用Windowsserver系列和Linux操作系统，能独立完','武汉市洪山区','yfye100@fiberhome.com',4,12,'2021-04-10 15:23','2021-04-10 15:26',NULL),(13,'12','高端技术需求','架构师','对项目整个架构，以及整个框架项目熟悉','兼职','32','35','武汉汉口','应届毕业生','本科','15薪，医疗保险','1、完成每天数据筛选\r\n2、擅于寻找数据规律、对数据进行分析\r\n3、将筛选的数据进行归类，准确地进行数据标注\r\n4、熟练使用Excel(数据筛选、分类、合并)\r\n5、按时按质完成各项数据，协助上级领导进行各项数据分析。\r\n岗位要求\r\n1、大专及以上学历\r\n2、工作经验不限\r\n3、细心、','北京王府井','1437552152@qq.com',4,11,'2021-04-10 15:26','2021-04-10 17:09',NULL),(14,'11','销售','大客户代表','语言组织能力以及销售能力','全职','12','14','安徽xxx','应届毕业生','本科','没有上限，取决于你的能力','系统将自动过滤学历、城市、工作年限 不符合 要求的需求，自动过滤的需求若 15 日内未作处理，拉勾将自动发送拒绝邮件至用户邮箱。','香港九龙岛','tu_chao@yeah.net',1,12,'2021-04-10 16:05',NULL,NULL),(18,'14','前端开发','web前端','html编写','实习','1000','2000','沈阳','1-3年','不限','新媒体影响力','负责做html前段','沈阳','zzy770192653@163.com',4,16,'2021-04-10 21:26','2021-04-10 21:27','111'),(19,'11','测试','高明丽','','兼职','','','','','','','','','',0,NULL,'2021-04-21 00:09',NULL,'叶贻福'),(20,'11','后端开发','大客户vue','22','实习','11','12','12','不限','本科','1212','121212','121212','121212',1,12,'2021-04-21 00:09',NULL,'叶贻福');

#
# Structure for table "pcUser"
#

CREATE TABLE `pcUser` (
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

#
# Data for table "pcUser"
#

INSERT INTO `pcUser` VALUES (11,'18133626045','123456','叶贻福','男','2019-09-01','安徽','1437552152','安徽新华学院','本科','通信工程',NULL,'1437552152@qq.com'),(12,'15556939150','123456','高明丽','女','2020-12-24','安徽','1437552152','新华学院','本科','通信工程',NULL,'1437552152@qq.com'),(13,'18133626046','123456',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'111','123456','yuan','男','2001-03-12','辽宁省','','','','',NULL,''),(15,'15556935151','123456',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,'222','123456',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,'999','999999',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
