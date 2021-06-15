<template>
  <router-view></router-view>
</template>
<script>
export default {
  name: "App",
};
</script>
<style>
body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
form,
dl,
dd,
dt {
  padding: 0;
  margin: 0;
}
ul {
  list-style: none;
}
img {
  border: none;
  display: block;
}
a {
  text-decoration: none;
  color: #000;
}
body {
  min-width: 320px;
}
html,
body {
  height: 100%;
}


/* 导航栏样式 */
.Navigation {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  border-top: 1px solid #f0f0f0;
  background-color: white;
  z-index: 10;
}

.Navigation > .item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  font-size: 14px;
  color: #555;
  height: 70px;
  overflow: hidden;
}

.Navigation > .item > img {
  position: relative;
  width: 28px;
  height: 28px;
  object-fit: cover;
}

/* 导航栏按钮按住时样式 */
.Navigation > .item:active {
  background-color: rgba(0, 0, 0, 0.02);
}

/* 导航栏激活样式 */
.Navigation > .item.active {
  color: #e74c3c;
}

/* 搜索栏 */
.SearchBar {
  position: relative;
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
  background-color: white;
}

.SearchBar > input {
  display: block;
  flex: 1;
  border: none;
  border-radius: 5px;
  padding: 10px;
  padding-left: 32px;
  height: 40px;
  font-size: 16px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.08);
}

.SearchBar > img {
  position: absolute;
  left: 15px;
  top: 18px;
  height: 24px;
  width: 24px;
}

/* 图标按钮组 */
.icon-btn-group {
  display: grid;
  grid-template-columns: repeat(4, auto);
  margin-bottom: 10px;
  background-color: white;
}

.icon-btn-group > .item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 75px;
  padding: 5px;
  margin: 5px auto;
  border-radius: 5px;
  font-size: 14px;
  color: #777;
  user-select: none;
}

.icon-btn-group > .item:active {
  background-color: rgba(0, 0, 0, 0.05);
}

.icon-btn-group > .item > img {
  width: 28px;
  height: 28px;
  margin-bottom: 5px;
  object-fit: cover;
}

/* 带标题带容器 */
.Container {
  font-size: 16px;
  background-color: white;
}

.Container > .title {
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.Container > .title > span {
  float: right;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #95a4a6;
  user-select: none;
}

.Container > .title > span > img {
  width: 22px;
  height: 22px;
  object-fit: cover;
}

.Container > .content {
  padding: 15px 10px;
}

/* 返回按钮 */
.Return {
  position: absolute;
  left: 5px;
  top: 5px;
  width: 30px;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
}

.Return:active {
  background-color: rgba(0, 0, 0, 0.1);
}

/* 小提示 */
.tips {
  color: #666;
  font-size: 14px;
  text-align: center;
}
#app{
  height: 100%;
}
</style>
