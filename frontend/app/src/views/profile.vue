<template>
  <v-main>
    <div class="profile-content">
      <div class="container-profile">
        <div class="row">
          <div class="col-md-6 ml-auto mr-auto">
            <div class="profile">
              <div class="avatar">
                <image-input v-model="avatar">
                  <div slot="activator">
                    <v-avatar
                      size="150px"
                      v-ripple
                      v-if="!avatar"
                      class="grey lighten-3 mb-3"
                      style="margin: mx-auto"
                    >
                      <span>Profilbild hinzufügen</span>
                    </v-avatar>
                    <v-avatar size="150px" v-ripple v-else class="mb-3">
                      <img
                        v-bind:src="'data:image/jpeg;base64,' + this.avatar"
                        alt="avatar"
                      />
                      <v-slide-x-transition>
                        <div v-if="avatar && saved == false">
                          <v-btn
                            class="primary"
                            @click="uploadImage"
                            :loading="saving"
                            >Save Avatar</v-btn
                          >
                        </div>
                      </v-slide-x-transition>
                    </v-avatar>
                  </div>
                </image-input>
              </div>
              <div class="name">
                <h3 class="title">{{ user.username }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <button class="btn-primary" @click="saveProfile()">speichern</button>
    <div class="container-profile information">
      <body-2 class="userinformation-heading">Email-Adresse</body-2>
      <h5 class="userinformation">{{ user.email }}</h5>
      <body-2 class="userinformation-heading">Vorname</body-2>
      <h5 class="userinformation">{{ user.firstname }}</h5>
      <body-2 class="userinformation-heading">Nachname</body-2>
      <h5 class="userinformation">{{ user.lastname }}</h5>
      <body-2 class="userinformation-heading">Straße</body-2>
      <h5 class="userinformation">{{ user.street }}</h5>
      <body-2 class="userinformation-heading">PLZ</body-2>
      <h5 class="userinformation">{{ user.zip }}</h5>
      <body-2 class="userinformation-heading">Stadt</body-2>
      <h5 class="userinformation">{{ user.city }}</h5>
    </div>
  
  </v-main>
</template>
<script>
import jwt_decode from "jwt-decode";
import ImageInput from "../components/Files/ImageInput.vue";
export default {
  data() {
    return {
      user: {},
      avatar: "",
      loading: false,
    };
  },
  components: { ImageInput: ImageInput },
  created() {
    this.$axios
      .get("/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((response) => {
        this.user = response.data;
        this.avatar = this.user.img;
      });
  },
  methods: {
    saveProfile() {
      this.userID = jwt_decode(localStorage.getItem("jwt"))._id;
      let data = {
        profileImg: this.avatar.base64String,
      };
      this.$axios.put("/user/" + this.userID, data).then(
        (response) => {
          if (response.status){
            this.$router.push('/home');
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    uploadImage() {
      this.saving = true;
      setTimeout(() => this.savedAvatar(), 1000);
    },
    savedAvatar() {
      console.log(this.avatar.base64);
      this.saving = false;
      this.saved = true;
    },
  },
};
</script>
<style >

.btn-primary{
  background: #32394f;
  border-radius: 32px;
  padding: 5px;
  text-align: center;
  cursor: pointer;
  margin-top: 5px;
}
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
  border-radius: 32%;
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