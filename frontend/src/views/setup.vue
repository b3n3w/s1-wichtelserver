<template>
  <v-app app style="background: rgba(0, 0, 0, 0)">
    <v-container fill-height fluid>
      <v-card class="mx-auto" style="background: rgba(20, 22, 31, 0.424)" max-width="600">
        <v-card-title class="title font-weight-regular justify-space-between">
          <span class="white--text">{{ currentTitle }}</span>
        </v-card-title>

        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-text-field v-model="groupKey" label="Gruppenkey" color="white" dark
                class="key-input mx-auto centered-input white--text"></v-text-field>
              <v-btn color="#f8d8c0" class="#303030--text" @click="enterGroup()">Gruppe beitreiten
              </v-btn>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <image-input v-model="avatar">
              <div slot="activator">
                <v-avatar size="150px" v-ripple v-if="!avatar" class="grey lighten-3 mb-3">
                  <span>Gruppenbild hinzufügen</span>
                </v-avatar>
                <v-avatar size="150px" v-ripple v-else class="mb-3">
                  <img :src="avatar.imageURL" alt="avatar" />
                </v-avatar>
              </div>
            </image-input>
            <v-slide-x-transition>
              <div v-if="avatar && saved == false">
                <v-btn class="primary" @click="uploadImage" :loading="saving">Save Avatar</v-btn>
              </div>
            </v-slide-x-transition>
            <v-card-text>
              <v-text-field v-model="groupname" label="Gruppename" color="white" dark></v-text-field>
              <v-textarea v-model="description" name="input-7-1" label="Gruppenbeschreibung" value="" hint="Hint text"
                dark></v-textarea>

              <v-btn color="rgba(50, 57, 79)" class="white--text" @click="createGroup()">Gruppe erstellen
              </v-btn>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="3">
            <image-input v-model="avatar">
              <div slot="activator">
                <v-avatar size="150px" v-ripple v-if="!avatar" class="grey lighten-3 mb-3" style="margin: mx-auto">
                  <span>Profilbild hinzufügen</span>
                </v-avatar>
                <v-avatar size="150px" v-ripple v-else class="mb-3">
                  <img :src="avatar.imageURL" alt="avatar" />
                </v-avatar>
              </div>
            </image-input>
            <v-slide-x-transition>
              <div v-if="avatar && saved == false">
                <v-btn class="primary" @click="uploadImage" :loading="saving">Save Avatar</v-btn>
              </div>
            </v-slide-x-transition>
            <v-combobox v-model="likes" label="Das mag ich besonders" small-chips multiple color="white" dark
              style="margin-bottom:5%">
            </v-combobox>
            <v-combobox v-model="dislikes" label="Das kann ich gar nicht leiden" small-chips multiple dark color="white"
              style="margin-bottom:5%">
            </v-combobox>
            <v-btn color="rgba(50, 57, 79)" class="white--text" @click="saveProfile()">Einrichtung abschließen
            </v-btn>
          </v-window-item>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn class="white--text" :disabled="step === 1" text @click="step--">
            Zurück
          </v-btn>
          <v-spacer></v-spacer>
          <v-avatar color="primary" class="subheading white--text" size="30" v-text="step"></v-avatar>
          <v-spacer></v-spacer>
          <v-btn :disabled="step === 3" color="rgba(50, 57, 79)" class="white--text" depressed text @click="step++">
            Weiter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import { jwtDecode } from "jwt-decode";
import swal from "sweetalert";
import ImageInput from "../components/Files/ImageInput.vue";

export default {
  data() {
    return {
      step: 1,
      loading: false,
      groupKey: "",
      userID: "",
      groupname: "",
      description: "",
      creator: "",
      avatar: "",
      likes: [],
      dislikes: [],
      loading4: false,
    };
  },
  components: {
    ImageInput: ImageInput,
  },
  methods: {
    enterGroup() {
      this.userID = jwtDecode(localStorage.getItem("jwt"))._id;

      let data = {
        groupKey: this.groupKey,
        userID: this.userID,
      };

      this.$axios.post("/group/enterGroup", data).then(
        (response) => {
          console.log(response.data);
          if (response.status === 201) {
            swal("Yeah", response.data.message, "success");
            this.$router.push("/home");
          }
        },
        (error) => {
          if (error.response.status === 409) {
            swal("Oh nein!", error.response.data.message, "error");
          }
        }
      );
    },
    createGroup() {
      let creator = jwtDecode(localStorage.getItem("jwt"))._id;

      let group = {
        groupname: this.groupname,
        description: this.description,
        creator: creator,
        groupimage: this.avatar.base64String,
      };

      this.$axios.post("/group/createGroup", group).then(
        (response) => {
          swal(
            
            "WUHU",
            "Der Gruppen die Gruppe erstellt! \n Der Zugangscode lautet \n" +
            response.data.data.entryKey,
            "success"
          );
        },
        (error) => {
          if (error.response.status === 409) {
            swal({
              title: "Oh nein !",
              text:
                "Lieber Wichtel, leider ist dieser Gruppenname schon vergeben",
            });
          }
        }
      );
    },
    saveProfile() {
      console.log(this.userID);
      this.userID = jwtDecode(localStorage.getItem("user"))._id;
      console.log(this.userID);
      let data = {
        profileImg: this.avatar.base64String,
        likes: this.likes,
        dislikes: this.dislikes,
      };
      this.$axios.put("/user/" + this.userID, data).then(
        (response) => {
          if (response.status) {
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
      this.saving = false;
      this.saved = true;
    },
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Möchtest du einer bestehenden Gruppe beitreten ?";
        case 2:
          return "Möchtest du eine neue Gruppe erstellen ?";
        default:
          return "Vervollständige dein Profil";
      }
    },
  },
};
</script>
<style scoped>
.centered-input>>>input {
  text-align: center
}


/deep/ .key-input {
  width: 100px;
}
</style>


