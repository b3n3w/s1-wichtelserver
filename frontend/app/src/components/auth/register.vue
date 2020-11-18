<template>
  <div>
    <div class="container-fluid">
      <div class="heading_index">
        <h1>S1 Wichtelserver</h1>
      </div>
    </div>
    <div id="christmas">
      <div class="flake large f-1"></div>
      <div class="flake large f-2"></div>
      <div class="flake large f-3"></div>
      <div class="flake large f-4"></div>
      <div class="flake large f-5"></div>
      <div class="flake large f-6"></div>
      <div class="flake large f-7"></div>
      <div class="flake large f-8"></div>
      <div class="flake large f-9"></div>
      <div class="flake large f-10"></div>
      <div class="flake large f-11"></div>
      <div class="flake large f-12"></div>
      <div class="flake large f-13"></div>
      <div class="flake large f-14"></div>
      <div class="flake large f-15"></div>
      <div class="flake large f-16"></div>
      <div class="flake large f-17"></div>
      <div class="flake f-18"></div>
      <div class="flake f-19"></div>
      <div class="flake f-20"></div>
      <div class="flake f-21"></div>
      <div class="flake f-22"></div>
      <div class="flake f-23"></div>
      <div class="flake f-24"></div>
      <div class="flake f-25"></div>
      <div class="flake f-26"></div>
      <div class="flake f-27"></div>
      <div class="flake f-28"></div>
      <div class="flake f-29"></div>
      <div class="flake f-30"></div>
      <div class="flake f-31"></div>
      <div class="tree left">
        <div class="snow"></div>
      </div>
      <div class="tree right">
        <div class="snow"></div>
      </div>
      <div class="ground"></div>
    </div>

    <div class="heading">
      <h2>Registration</h2>

      <form action="#"
      @submit.prevent="registerUser">
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
    
      try {
        console.log(this.register.email)
        let response = await this.$http.post("/register", this.register);
        console.log(response);
        let token = response.data.token;
        if (token) {
          localStorage.setItem("jwt", token);
          this.$router.push("/");
          swal("Success", "Registration Was successful", "success");
        } else {
          swal("Error", "Something Went Wrong", "Error");
        }
      } catch (err) {
        let error = err.response;
        if (error.status == 409) {
          swal("Error", error.data.message, "error");
        } else {
          swal("Error", error.data.err.message, "error");
        }
      }
    },
  },
};
</script>
