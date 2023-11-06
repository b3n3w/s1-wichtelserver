<template>
  <div class="heading">
    <h2>Registriere dich jetzt !</h2>
    <form action="#" @submit.prevent="registerUser">
      <div class="input-group input-group-lg">
        <span class="input-group-addon"><i class="fa fa-user"></i></span>
        <input
          type="text"
          id="username"
          class="form-control"
          placeholder="Benutzername"
          v-model="username"
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
          v-model="password"
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
          v-model="firstname"
          required
        />
      </div>
      <div class="input-group input-group-lg">
        <span class="input-group-addon"><i class="fa fa-user"></i></span>
        <input
          type="text"
          class="form-control"
          placeholder="Nachname"
          v-model="lastname"
          required
        />
      </div>
      <div class="input-group input-group-lg">
        <span class="input-group-addon"><i class="fa fa-user"></i></span>
        <input
          type="text"
          class="form-control"
          placeholder="Email"
          v-model="email"
          required
        />
        <span class="error" v-if="msg.email">{{ msg.email }}</span>
      </div>
      <div class="input-group input-group-lg">
        <span class="input-group-addon"><i class="fa fa-lock"></i></span>
        <input
          type="street"
          class="form-control"
          placeholder="Straße"
          v-model="street"
          required
        />
      </div>
      <div class="input-group input-group-lg">
        <span class="input-group-addon"><i class="fa fa-lock"></i></span>
        <input
          type="city"
          class="form-control"
          placeholder="Stadt"
          v-model="city"
          required
        />
      </div>
      <div class="input-group input-group-lg">
        <span class="input-group-addon"><i class="fa fa-lock"></i></span>
        <input
          type="zip"
          class="form-control"
          placeholder="PLZ"
          v-model="zip"
          required
        />
        <span class="error" v-if="msg2.zip">{{ msg2.zip }}</span>
      </div>

      <button class="float" style="background-color: #f8d8c0; color: #303030;" type="submit">Registrieren</button>
    </form>
  </div>
</template>

<script>
import swal from "sweetalert";

export default {
  data() {
    return {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      street: "",
      city: "",
      zip: "",
      msg: [],
      msg2: []
    };
  },
  watch: {
    email(value) {
      // binding this to the data value in the email input
      this.email = value;
      this.validateEmail(value);
    },
    zip(value) {
      this.zip = value;
      this.validateZip(value);
    },
  },
  methods: {
    validateEmail(value) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg["email"] = "";
      } else {
        this.msg["email"] = "Invalide Email Addresse";
      }
    },
    validateZip(value) {
      if (/(^\d{5}$)/.test(value)) {
        this.msg2["zip"] = "";
      } else {
        this.msg2["zip"] = "Invalide PLZ";
      }
    },
    async registerUser() {
      let register = {
        username: this.username,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        street: this.street,
        city: this.city,
        zip: this.zip,
      };
      this.$axios.post("/user/register", register).then(
        (response) => {
      
          let token = response.data.token;
          if (token) {
            localStorage.setItem("jwt", token);
            swal(
              "JUHU",
              "Registrierung erfolgreich!\nBitte verifiziere deine E-Mail Adresse",
              "success"
            );
            this.$router.push("/");
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
<style scoped>
v-application .error{
  color: rgba(236, 211, 211, 0);
  background-color: rgba(202, 118, 118, 0)
}
</style>