<template>
  <div>
    <div class="Navigation">
      <div class="item" data-page="index" @click="switchPage('/')">
        <img src="../../assets/svg/home-3-line.svg" />
        <div>首页</div>
      </div>
      <div class="item active" data-page="menu" @click="switchPage('/Menu')">
        <img src="../../assets/svg/list-unordered-active.svg" />
        <div>分类</div>
      </div>
      <div class="item" data-page="user" @click="switchPage('/User')">
        <img src="../../assets/svg/user-smile-line.svg" />
        <div>个人</div>
      </div>
    </div>
    <!-- 搜索栏 -->
     <SearchData />
    <!-- 分类菜单 -->
    <div class="Menu">
      <!-- 分类名称 -->
      <div class="Left">
        <div :class="{'active':index==active?true:false}" v-for="(item,index) in list" :key="index" @click="goChange(index)">{{item.name}}</div>
      </div>
      <!-- 分类内容 -->
      <div class="Right">
        <div class="Content">
          <div class="grid" v-for="(item,index) in list[active].list" :key="index" @click="goDetail">
            <img :src="item.image" />
            <div>{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchData from "../../components/Search.vue";
export default {
  data() {
    return {
       list: [
        { name: "男装",list:[{name:'皮衣',image: require('../../assets/img/polo衫.jpg')},{name:'西装',image: require('../../assets/img/西装.jpg')},{name:'西装',image: require('../../assets/img/西装.jpg')}] },
        { name: "女装",list:[{name:'polo衫',image:  require('../../assets/img/polo衫.jpg')},{name:'皮衣',image:  require('../../assets/img/皮衣.jpg')}]  },
        { name: "食品",list:[{name:'皮衣',image:  require('../../assets/img/皮衣.jpg')}]  },
        { name: "鞋包",list:[{name:'皮裤',image:  require('../../assets/img/西装.jpg')}]  },
        { name: "手机",list:[{name:'西装',image:  require('../../assets/img/工装裤.jpg')}]  },
        { name: "母婴" ,list:[{name:'牛仔裤',image:  require('../../assets/img/西装.jpg')}] },
        { name: "电器",list:[{name:'皮裤',image:  require('../../assets/img/西装.jpg')}]  },
        { name: "数码",list:[{name:'工装裤',image:  require('../../assets/img/西装.jpg')}]  },
        { name: "生鲜",list:[{name:'牛仔裤',image:  require('../../assets/img/西装.jpg')}]  },
      ],
      active: 0,
    };
  },
  components: { SearchData },
  mounted() {},
  methods: {
    switchPage(url) {
      this.$router.push(url);
    },
    goChange(index){
        this.active=index
    },
    goDetail(){
          this.$router.push({
        path: "/product",
        query: {
          id:1,
        },
      });
    }
  },
};
</script>

<style  scoped>
.Menu {
  flex: 1;
  display: flex;
}

/* 左侧菜单栏 */
.Menu > .Left {
  min-width: 80px;
  background-color: rgba(0, 0, 0, 0.02);
}

.Menu > .Left > div {
  padding: 10px 0;
  text-align: center;
  border-left: 3px solid transparent;
  user-select: none;
}

.Menu > .Left > div.active {
  border-color: #e74c3c;
  background-color: white;
}

/* 右侧内容栏 */
.Menu > .Right {
  flex: 1;
}

.Menu > .Right > .Content {
  display: grid;
  gap: 5px;
  padding: 10px;
  grid-template-columns: repeat(3, auto);
}

.Menu > .Right .grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  padding: 5px;
  margin: auto;
  border-radius: 5px;
}

.Menu > .Right .grid:active {
  background-color: rgba(0, 0, 0, 0.05);
}

.Menu > .Right .grid > img {
  width: 40px;
  height: 40px;
  margin-bottom: 5px;
  border-radius: 5px;
  object-fit: cover;
}
</style>