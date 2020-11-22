<template>
  <div>
    <Menu />
    <div class="profile-content">
      <div class="container-profile">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto">
            <div class="profile">
              <div class="avatar">
                <img  />
                <img
                  v-bind:src="'data:image/jpeg;base64,'+imageBase64"
                  alt="Circle Image"
                  class="profile-img"
                />
                <input
                  @change="handleImage"
                  class="custom-input"
                  type="file"
                  id="imgupload"
                  accept="image/*"
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
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      user: {},
      imageBase64: ""
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
        this.imageBase64 = this.user.img
  
      });
  },
  methods: {
    handleImage(e) {
      const selectedImage = e.target.files[0]; // get first file
      this.createBase64Image(selectedImage);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
        this.uploadImage();
      };
      reader.readAsDataURL(fileObject);
    },
    uploadImage() {
      const { image } = this;
      let uID = jwt_decode(localStorage.getItem("jwt"))._id;
      this.$axios
        .post("/upload", { image: image, uID: uID })
        .then((response) => {
          this.remoteUrl = response.data.url;
        })
        .catch((err) => {
          return new Error(err.message);
        });
    },
  },
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
.profile-img {
  width: 150px;
  height: 150px;
  border-radius: 32%

}
.title {
  color: white;
}

.information {
  padding-bottom: 10px;
  padding-top: 10px;
}
.userinformation-heading {
  color: rgba(245, 245, 245, 0.493);
}
.userinformation {
  color: rgba(255, 255, 255, 0.657);
}


</style>