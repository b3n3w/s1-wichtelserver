<template>
  <div class="header">
    
    <div class="header-right">
      <button @click="logoutUser()">Logout</button>
      <img
        class="icon-header"
        :to="'/'"
        src="@/assets/images/gift.svg"
      />
        <figcaption class="figcaption">Wichteln</figcaption>
      <div class="vl"></div>
      <img
        class="icon-header"
        @click="showUserProfile()"
        src="@/assets/images/profile.svg"
      />
      <figcaption class="figcaption">Profil</figcaption>
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
      this.$router.push("/profile");
    },
    gotoHome() {
      this.$router.push("/home");
    },
  },
};
</script>

<style>
/* Style the header with a grey background and some padding */
.header {
  overflow: hidden;
  background-color: hsla(229, 22%, 10%, 0.424);
  padding: 10px 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

/* Style the header links */
.header button {
  float: right;
  text-align: center;
  padding: 20px;
  border: none;
  outline: none;
  margin: 5px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  width: 100px;
  border-radius: 32px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(245, 222, 179, 0);
}


.img-header {
  max-width: 5%;
  min-width: 4%;
  float: left;
  margin-left: 10px;
}
/* Change the background color on mouse-over */
.header button:hover {
  background-color: rgba(255, 255, 255, 0.137);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

/* Style the active/current link*/
.header button.active {
  background-color: #32394f;
  color: white;
}

/* Float the link section to the right */
.header-right {
  float: right;
  
}

.figcaption{
width: 20px;
}

/* Add media queries for responsiveness - when the screen is 500px wide or less, stack the links on top of each other */
@media screen and (max-width: 500px) {
  .header button {
    display: block;
    text-align: left;
    padding: 10px;
    text-align: center;
  }
  .header {
    padding: 30px 10px;
  }
  .img-header {
    margin-top: 5px;
    margin-right: 20px;
    max-width: 10%;
  }
  .icon-header {
    width: 40px;
  }
 
}
</style>

