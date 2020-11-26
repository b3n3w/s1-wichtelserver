<template>
  <div>
    <v-app-bar color="rgba(20, 22, 31, 0.424)" dense dark height="70">
      <v-img
        class="mx-2"
        max-height="45"
        max-width="45"
        contain
        :to="'/'"
        src="../assets/s1_logo.png"
      />

      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light white--text">S1</span>
        <span class="white--text">WICHTELN</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon @click="gotoHome()">mdi-gift</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon  @click="showUserProfile()">mdi-person</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon @click="logoutUser()">mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //logoPath: path.join(__dirname, 'src', 'assets', 's1_logo.png')
    };
  },
  methods: {
    async logoutUser() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    },
    showUserProfile() {
      this.$router.push("/profile");
    },
    gotoHome() {
      this.$router.push("/home");
    },
  },
};
</script>