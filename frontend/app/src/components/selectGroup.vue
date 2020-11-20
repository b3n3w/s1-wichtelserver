<template>
  <div>
    <p>Bestehender Gruppe beitreten ?</p>

    <input v-model="data.groupKey" type="text" />
    <div>
      <button @click="enterGroup()">Bestehender Gruppe beitreten</button>
    </div>
    <div>
      <button @click="createGroup()">Neue Wichtel Gruppe erstellen</button>
    </div>
  </div>
</template>
<script>
import jwt_decode from "jwt-decode";
import swal from "sweetalert";

export default {
  data() {
    return {
      data: {
        groupKey: "",
        userID: "",
      },
    };
  },
  methods: {
    createGroup() {
      console.log("ok");
      this.$router.push("/createGroup");
    },
    enterGroup() {
      this.data.userID = jwt_decode(localStorage.getItem("jwt"))._id;

    
      this.$axios.post("/group/enterGroup", this.data).then(
        (response) => {
          console.log(response.data)
         if (response.status === 201){
           swal("Yeah", response.data.message, "success")
           this.$router.push('/home')
         }
        },
        (error) => {
          if (error.response.status === 409) {
            swal("Oh nein!", error.response.data.message, "error");
          }
        }
      );
    },
  },
};
</script>
<style scoped>
</style>