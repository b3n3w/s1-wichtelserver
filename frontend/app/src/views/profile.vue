<template>
  <div>
    <Menu />
    <div class="profile-content">
      <div class="container-profile">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto">
            <div class="profile">
              <div class="avatar">
                <img
                  src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU0NjQzOTk4OTQ4OTkyMzQy/ansel-elgort-poses-for-a-portrait-during-the-baby-driver-premiere-2017-sxsw-conference-and-festivals-on-march-11-2017-in-austin-texas-photo-by-matt-winkelmeyer_getty-imagesfor-sxsw-square.jpg"
                  alt="Circle Image"
                  class="img-raised rounded-circle img-fluid"
                />
              </div>
              <div class="name">
                <h3 class="title">{{ user.username }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-profile information">
      <h5 class="userinformation-heading">Email-Adresse</h5>
      <h4 class="userinformation">{{ user.email }}</h4>
      <h5 class="userinformation-heading">Vorname</h5>
      <h4 class="userinformation">{{ user.firstname }}</h4>
      <h5 class="userinformation-heading">Nachname</h5>
      <h4 class="userinformation">{{ user.lastname }}</h4>
      <h5 class="userinformation-heading">Straße</h5>
      <h4 class="userinformation">{{ user.street }}</h4>
      <h5 class="userinformation-heading">PLZ</h5>
      <h4 class="userinformation">{{ user.zip }}</h4>
      <h5 class="userinformation-heading">Stadt</h5>
      <h4 class="userinformation">{{ user.city }}</h4>
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
.container-profile {
  background: hsla(229, 22%, 10%, 0.631);
  border-radius: 32px;
  padding-top: 5px;
  margin-top: 10px;
  margin-left: 10%;
  margin-right: 10%;
}
.img-raised {
  width: 30%;
}
.title {
  color: white;
}

.information {
  padding-bottom: 10px;
  padding-top: 10px;
}
.userinformation-heading{
  color:rgba(245, 245, 245, 0.493);
}
.userinformation {
  color: rgba(255, 255, 255, 0.657);
}
</style>