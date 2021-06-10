<template>
  <div>
    <Return title="我的" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.name"
        name="name"
        label="真实姓名"
        placeholder="真实姓名"
        :rules="[{ required: true, message: '请填写真实姓名' }]"
      />

      <van-field
        v-model="form.content"
        name="content"
        label="地址"
        placeholder="地址"
        :rules="[{ required: true, message: '请填写地址' }]"
      />

      <van-field
        v-model="form.email"
        name="email"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <van-field name="uploader" label="头像上传">
        <template #input>
          <van-uploader
            v-model="form.uploader"
            :max-count="1"
            accept="image/*"
            :after-read="afterRead"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import Return from "../../components/Return.vue";
import axios from "axios";
import { resume, updateResume } from "@/utils/getData";
import { getStore } from "@/utils/storage";
export default {
  components: { Return },
  data() {
    return {
      userInfo: getStore("userInfo"),
      form: {
        name: "",
        email: "",
        uploader: [],
        content: "",
        headpic: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const that = this;
      resume({ id: this.userInfo.id }).then(res => {
        if (res.status == 1) {
          that.form = res.data;
          that.form.uploader = [{ url: res.data.headpic }];
        } else {
          that.$toast(res.msg);
        }
      });
    },
    onSubmit(values) {
      console.log("submit", values);
      const that = this;
      values.id = this.userInfo.id;
      values.uploader = [];
      values.headpic = that.form.headpic;
      updateResume({ ...values }).then(res => {
        if (res.status == 1) {
          that.$toast("修改成功");
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
          that.form.headpic = "https://www.qianxunzhe.cn/" + data.url;
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
