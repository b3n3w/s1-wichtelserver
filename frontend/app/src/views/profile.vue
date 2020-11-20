<template>
  <div>
    <Menu />
    <div class="container">
      <p>Username: {{ user.username }}</p>
      <p>Emailadresse: {{ user.email }}</p>
      <p>Vorname: {{ user.firstname }}</p>
      <p>Nachname: {{ user.lastname }}</p>
      <p>Straße: {{ user.street }}</p>
      <p>PLZ: {{ user.zip }}</p>
      <p>Stadt: {{ user.city }}</p>
    </div>
  </div>
</template>
<script>
import Menu from "@/components/Menu";
//import jwt_decode from "jwt-decode";

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
    this.$axios
      .get("/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((response) => {
        this.user = response.data;
      });
  },
  methods: {},
};
</script>
<style >
</style>