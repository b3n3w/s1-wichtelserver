<template>
  <div>
    <Menu />
    <div class="container">
        <p>Username</p>
        <p>Emailadresse</p>
    </div>
  </div>
</template>
<script>
import Menu from "@/components/Menu";
export default {
    data(){
        return {
           username: ""
        }
    },
  components: {
    Menu,
  },
  created() {
    this.fetchData();
  },
  methods: {
      fetchData(){
         //  this.$axios.get("/profile").then(
      }
  },
};
</script>
<style >

</style>