<template>
  <div class="heading">
    <h2>Sign In</h2>
    <form action="#" @submit.prevent="loginUser">
      <div class="input-group input-group-lg">
        <span class="input-group-addon"><i class="fa fa-user"></i></span>
        <input
          type="text"
          class="form-control"
          placeholder="Benutzername"
          v-model="login.username"
          required
        />
      </div>

      <div class="input-group input-group-lg">
        <span class="input-group-addon"><i class="fa fa-lock"></i></span>
        <input
          type="password"
          class="form-control"
          placeholder="Passwort"
          v-model="login.password"
          required
        />
      </div>

      <button class="float">Login</button>

      Noch keinen Wichtelaccount anglegt?
      <router-link to="/register">Registrieren</router-link>
    </form>
  </div>
</template>

<script>
import swal from "sweetalert";

export default {
  data() {
    return {
      login: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser() {
      this.$axios.post("/user/login", this.login).then(
        (response) => {
          console.log(response);
          let token = response.data.token;

          if (token) {
            localStorage.setItem("jwt", token);
            swal("Success", "Login Successful", "Error");
            if (response.data.firstLogin) {
              this.$router.push("/selectGroup");
            } else {
              this.$router.push("/home");
            }
          }
        },
        (error) => {
          if (error.response.status === 402) {
            swal({
              title: "Och nö",
              text: "Lieber Wichtel, bitte verifiziere deine Email",
            });
          } else {
            swal("Error", "Something Went Wrong", "error");
          }
        }
      );
    },
  },
};
</script>
