<template>
  <div>
    <form @submit.prevent="createGroup"></form>
    <div class="input-group input-group-lg">
      <input
        type="text"
        class="form-groupdiscription"
        placeholder="Gruppenname"
        v-model="group.name"
        required
      />
    </div>
    <div class="input-group input-group-lg">
      <span class="input-group-addon"><i class="fa fa-user"></i></span>
      <input
        type="text"
        class="form-groupdescription"
        placeholder="Gruppenbeschreibung"
        v-model="group.description"
        required
      />
      <button @click="selectGroup()">Zurück</button>
      <button @click="createGroup()">Neue Wichtelgruppe erstellen</button>
    </div>
  </div>
</template>
<script>
import swal from "sweetalert";
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      group: {
        name: "",
        description: "",
        creator: "",
      },
    };
  },
  methods: {
    createGroup() {
      this.group.creator = jwt_decode(localStorage.getItem("jwt"))._id;
      
      this.$axios.post("/group/createGroup", this.group).then(
        (response) => {
          console.log(response);
          swal("WUHU", "Neue Wichtelgruppe erstellt", "Success");
        },
        (error) => {
          if (error.response.status === 409) {
            swal({
              title: "Oh nein !",
              text:
                "Lieber Wichtel, leider ist dieser Gruppenname schon vergeben",
            });
          }
        }
      );
    },
    selectGroup() {
      this.$router.push("/selectGroup");
    },
  },
};
</script>

<style scoped>
</style>