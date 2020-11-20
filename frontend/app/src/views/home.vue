<template>
  <div>
    <Menu />
    <Card />
  </div>
</template>
<script>
import Menu from "@/components/Menu";
import Card from "@/components/Card/Card";

export default {
  components: {
    Menu,
    Card,
  },
  created() {
    let userID = jwt_decode(localStorage.getItem("jwt"))._id;
    this.$axios.get("/group:" + userID).then((response) => {

  
    });
  },
  methods: {},
};
</script>
<style >
</style>