<template>
<div class="main">
<router-view></router-view>
<Footer/>
</div>
</template>
<script>
import Footer from "@/components/footer/index"
export default {
  components:{Footer}
}
</script>