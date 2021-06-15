<template>
  <div>
    <Return title="发布" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.name"
        name="name"
        label="物品名称"
        placeholder="物品名称"
        :rules="[{ required: true, message: '请填写物品名称' }]"
      />

   
      <van-field label="类型" name="status">
        <template #input>
          <van-radio-group v-model="form.radio" direction="horizontal">
            <van-radio :name="item.id" v-for="(item,index) in typeList1" :key="index" style="margin-top:4px;margin-right:4px">{{item.name}}</van-radio>
          </van-radio-group>
        </template>
      </van-field>

     

      <van-field
        v-model="form.phone"
        name="phone"
        label="指导价格"
        placeholder="指导价格"
        :rules="[{ required: true, message: '请填写指导价格' }]"
      />


       <van-field name="uploader" label="商品图片">
        <template #input>
          <van-uploader
            v-model="form.uploader"
            :max-count="1"
            accept="image/*"
            :after-read="afterRead"
          />
        </template>
      </van-field>

      <van-field
        v-model="form.descc"
        name="descc"
        label="物品描述"
        placeholder="物品描述"
        :rules="[{ required: true, message: '请填写物品描述' }]"
      />


      <van-field
        v-model="form.content"
        name="content"
        rows="2"
        autosize
        label="说明"
        type="textarea"
        maxlength="500"
        placeholder="请输入说明"
        :rules="[{ required: true, message: '请填写说明', maxlength: 500 }]"
        show-word-limit
      />

      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import Return from "../../components/Return.vue";
import axios from "axios";
import { addBlog,typeList } from "@/utils/getData";
import { getStore } from "@/utils/storage";

export default {
  components: { Return },
  data() {
    return {
      userInfo: getStore("userInfo"),
      typeList1:[],
      form: {
        name: "",
        imageUrl: "",
        uploader: [],
        descc: "",
        content: "",
        status: "1",
        phone: ""
      }
    };
  },
   created() {
    this.list();
  },
  methods: {
      list() {
      typeList().then((res) => {
        if (res.status == 1) {
          this.typeList1 = res.data;
        } else {
          this.$toast(res.msg);
        }
      });
    },
    onSubmit(values) {
      console.log("submit", values);
      const that = this;
      values.userId = this.userInfo.id;
      values.userName = this.userInfo.name || "";
      values.uploader = [];
      values.imageUrl = that.form.imageUrl;
      addBlog({ ...values }).then(res => {
        if (res.status == 1) {
          that.$toast("发布成功");
          that.$router.push({ path: "/home" });
        } else {
          that.$toast(res.msg);
        }
      });
    },
    afterRead(file) {
      let that = this;
      let params = new FormData();
      params.append("file", file.file);
      params.append("id", this.id);
      params.append("type", this.type);
      let config = {
        headers: {
          //添加请求头
          "Content-Type": "multipart/form-data"
        }
      };
      axios
        .post(
          "https://www.qianxunzhe.cn/renren-fast/sys/syspic/fileUpload",
          params,
          config
        )
        .then(({ data }) => {
          that.form.uploader = [
            { url: "https://www.qianxunzhe.cn/" + data.url }
          ];
          that.form.imageUrl = "https://www.qianxunzhe.cn/" + data.url;
        });
    }
  }
};
</script>
<style>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.swiper {
  width: 100%;
  height: 200px;
  margin: auto;
}

.van-swipe,
.swiper .photo {
  width: 100%;
  height: 100%;
}
.listhead {
  font-size: 18px;
  margin-bottom: 30px;
  margin-top: 10px;
}
</style>
