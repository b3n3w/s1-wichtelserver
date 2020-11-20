<template>
  <div>
    <Menu />
    <div v-for="group in groups" :key="group.groupname">
      <group-card :groupname="group.groupname"> </group-card>
    </div>
  </div>
</template>
<script>
import Menu from "@/components/Menu";

import GroupCard from "@/components/Card/GroupCard";

//import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      groups: {},
    };
  },
  components: {
    Menu,
    GroupCard,
  },
  created() {
    //let userID = jwt_decode(localStorage.getItem("jwt"))._id;
    this.$axios
      .get("/user/groups", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((response) => {
        this.groups = response.data;
        console.log(this.groups);
      });
  },
  methods: {},
};
</script>
<style >
</style>