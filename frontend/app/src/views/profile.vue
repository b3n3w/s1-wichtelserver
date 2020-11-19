<template>
  <div>
    <Menu />
    <div class="container">
      <p>Username {{ user.name }}</p>
      <p>Emailadresse {{ user.email }}</p>
      <p>Straße {{ user }}</p>
    </div>
    <button @click="addUsertoGroup()">Test</button>
  </div>
</template>
<script>
import Menu from "@/components/Menu";
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      user: {},
    };
  },
  components: {
    Menu,
  },
  created() {
    this.user = jwt_decode(localStorage.getItem("jwt"));
  },
  methods: {
    
    addUsertoGroup() {
      this.$axios.post("/user/addGroup", this.user).then((response) => {
        console.log(response);
      });
    },
  },
};
</script>
<style >
</style>