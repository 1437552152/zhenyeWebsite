<template>
  <div>
    <Return title="发布" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.name"
        name="name"
        label="新闻标题"
        placeholder="新闻标题"
        :rules="[{ required: true, message: '请填写新闻标题' }]"
      />

      <van-field
        v-model="form.descc"
        name="descc"
        label="描述"
        placeholder="描述"
        :rules="[{ required: true, message: '请填写描述' }]"
      />

      <van-field name="uploader" label="焦点图上传">
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
        v-model="form.content"
        name="content"
        rows="2"
        autosize
        label="内容"
        type="textarea"
        maxlength="500"
        placeholder="请输入内容"
        :rules="[{ required: true, message: '请填写内容', maxlength: 500 }]"
        show-word-limit
      />
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import Return from "../../components/Return.vue";
import axios from "axios";
import { addBlog } from "@/utils/getData";
import { getStore } from "@/utils/storage";
export default {
  components: { Return },
  data() {
    return {
      userInfo: getStore("userInfo"),
      form: {
        name: "",
        imageUrl: "",
        uploader: [],
        descc: "",
        content: "",
      },
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      const that = this;
      values.userId = this.userInfo.id;
      values.userName = this.userInfo.name || "";
      values.uploader = [];
      values.imageUrl = that.form.imageUrl;
      addBlog({ ...values }).then((res) => {
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
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(
          "https://www.qianxunzhe.cn/renren-fast/sys/syspic/fileUpload",
          params,
          config
        )
        .then(({ data }) => {
          that.form.uploader = [
            { url: "https://www.qianxunzhe.cn/" + data.url },
          ];
          that.form.imageUrl = "https://www.qianxunzhe.cn/" + data.url;
        });
    },
  },
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
