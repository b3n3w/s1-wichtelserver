<template>
  <div class="header">
    <button @click="logoutUser()">Wichteln</button>
    <div class="header-right">
      <button class="active" @click="gotoHome()">Wichteln</button>
      <button @click="showUserProfile()">Profil</button>
      <button @click="logoutUser()">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    async logoutUser() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    },
    showUserProfile() {
      this.$router.push('/profile');
    },
    gotoHome(){
      this.$router.push('/home');
    }
  },
};
</script>

<style>
/* Style the header with a grey background and some padding */
.header {
  overflow: hidden;
  background-color: #f1f1f10c;
  border-color: whitesmoke;
  padding: 20px 10px;
}

/* Style the header links */
.header button {
  float: left;
  color: black;
  text-align: center;
  padding: 20px;
  margin: 5px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  border-radius: 4px;
  background-color: rgba(245, 222, 179, 0);
}

/* Style the logo link (notice that we set the same value of line-height and font-size to prevent the header to increase when the font gets bigger */
.header a.logo {
  font-size: 25px;
  font-weight: bold;
}

/* Change the background color on mouse-over */
.header button:hover {
  background-color: #ddd;
  color: black;
}

/* Style the active/current link*/
.header button.active {
  background-color: rgb(85, 16, 45);
  color: white;
}

/* Float the link section to the right */
.header-right {
  float: right;
}

/* Add media queries for responsiveness - when the screen is 500px wide or less, stack the links on top of each other */
@media screen and (max-width: 500px) {
  .header button {
    float: none;
    display: block;
    text-align: left;
  }
  .header-right {
    float: none;
  }
}
</style>

