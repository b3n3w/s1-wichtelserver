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
        <h2>Sign In</h2>
        <form action="#">
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
           
           Noch keinen Wichtelaccount anglegt? <router-link to="/register"
              >Registrieren</router-link
            >
        </form>
      </div>
  
  </div>
</template>

<script>
import swal from "sweetalert";
export default {
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser() {
      try {
        let response = await this.$http.post("/login", this.login);
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        if (token) {
          swal("Success", "Login Successful", "Error");
          this.$router.push("/home");
        }
      } catch (err) {
        swal("Error", "Something Went Wrong", "error");
        console.log(err.response);
      }
    },
  },
};
</script>

