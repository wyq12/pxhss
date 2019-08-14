<template>
  <div>
    <calendar1 v-if="show"/>
    <calendar2 v-if="!show"/>
  </div>
</template>
<script>
import { getUserInfo } from "@/api/user.js";
import calendar1 from "./calendar1.vue";
import calendar2 from "./calendar2.vue";
export default {
  components: {
    calendar1,
    calendar2
  },
  data() {
    return {
      show: false
    };
  },
  created() {
    getUserInfo().then(res => {
      if (res.data.court.name == "殿前法庭") {
        this.show = false;
      } else {
        this.show = true;
      }
    });
  }
};
</script>
