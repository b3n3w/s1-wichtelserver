<template>
  <div class="heading">
    <h2>Registration</h2>
    <form action="#" @submit.prevent="registerUser">
      <div class="input-group input-group-lg">
        <span class="input-group-addon"><i class="fa fa-user"></i></span>
        <input
          type="text"
          id="username"
          class="form-control"
          placeholder="Benutzername"
          v-model="register.username"
          required
        />
      </div>
      <div class="input-group input-group-lg">
        <span class="input-group-addon"><i class="fa fa-user"></i></span>
        <input
          type="password"
          id="password"
          class="form-control"
          placeholder="Passwort"
          v-model="register.password"
          required
        />
      </div>
      <div class="input-group input-group-lg">
        <span class="input-group-addon"><i class="fa fa-user"></i></span>
        <input
          type="text"
          id="firstname"
          class="form-control"
          placeholder="Vorname"
          v-model="register.firstname"
          required
        />
      </div>
      <div class="input-group input-group-lg">
        <span class="input-group-addon"><i class="fa fa-user"></i></span>
        <input
          type="text"
          class="form-control"
          placeholder="Nachname"
          v-model="register.lastname"
          required
        />
      </div>
      <div class="input-group input-group-lg">
        <span class="input-group-addon"><i class="fa fa-user"></i></span>
        <input
          type="text"
          class="form-control"
          placeholder="Email"
          v-model="register.email"
          required
        />
      </div>
      <div class="input-group input-group-lg">
        <span class="input-group-addon"><i class="fa fa-lock"></i></span>
        <input
          type="street"
          class="form-control"
          placeholder="Straße"
          v-model="register.street"
          required
        />
      </div>
      <div class="input-group input-group-lg">
        <span class="input-group-addon"><i class="fa fa-lock"></i></span>
        <input
          type="city"
          class="form-control"
          placeholder="Stadt"
          v-model="register.city"
          required
        />
      </div>
      <div class="input-group input-group-lg">
        <span class="input-group-addon"><i class="fa fa-lock"></i></span>
        <input
          type="zip"
          class="form-control"
          placeholder="PLZ"
          v-model="register.zip"
          required
        />
      </div>

      <button class="float" type="submit">Registrieren</button>

      <p class="p_login">
        Bereits einen Account anglegt?
        <router-link to="/">Login</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import swal from "sweetalert";

export default {
  data() {
    return {
      register: {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        email: "",
        street: "",
        city: "",
        zip: "",
      },
    };
  },
  methods: {
    async registerUser() {
      this.$axios.post("/register", this.register).then(
        (response) => {
          console.log(response);
          let token = response.data.token;
          if (token) {
            localStorage.setItem("jwt", token);
            this.$router.push("/");
            swal("Success", "Registration Was successful", "success");
          }
         
        },
        (error) => {
           if (error.status == 409) {
            swal("Error", error.data.message, "error");
          } else {
            swal("Error", error.data.err.message, "error");
          }
        }
      );
    },
  },
};
</script>
