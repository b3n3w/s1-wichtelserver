<template>


    <v-main>
      <div transition="expand" v-for="group in groups" :key="group.groupname">
        <group-card
          :groupId="group.groupId"
          :usercount="group.usercount"
          :groupname="group.groupname"
          :groupstatus="group.groupstatus"
          :groupdescription="group.groupdescription"
          :groupimage="group.groupimage"
        >
        </group-card>
      </div>
    </v-main>

</template>
<script>

import GroupCard from "@/components/Card/GroupCard";

//import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      groups: {},
    };
  },
  components: {

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
body {
  background: bisque;
}

.expand-transition {
  transition: all 10s ease;
  height: 30px;
  padding: 10px;
  background-color: #eee;
  overflow: hidden;
}
</style> >


