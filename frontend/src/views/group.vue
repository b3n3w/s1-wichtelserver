<template>
  <div>
    <v-alert
      style="margin-top: 1%"
      color="#2A3B4D"
      dark
      icon="mdi-firework"
      dense
    >
      {{ groupstatus }}
    </v-alert>
    <div class="groupstatus">
      <h3></h3>
    </div>
    <button
      class="btn-start"
      v-show="userstatus && !wichtelstarted"
      @click="startWichteln()"
    >
      Starte Wichteln
    </button>
    <button class="btn-start" v-show="wichtelstarted" @click="getPartner()">
      Zeige mir meinen Wichtel
    </button>
    <v-overlay :value="overlay">
      <v-card :loading="loading" class="mx-auto my-12" max-width="330" style="margin-bottom: 20px">
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-img
          height="210"
          v-bind:src="'data:image/jpeg;base64,' + this.partner.image"
          style="margin-bottom: 8px"
        ></v-img>
        <v-icon class="close" @click="overlay = false">mdi-close</v-icon>

        <h3 style="margin-bottom: 2%">{{ this.partner.username }}</h3>

        <v-divider class="mx-4"></v-divider>

        <p style="margin-bottom: 1%">Das mag dein Wichtel besonders</p>
        <v-card-text style="margin-top: -5px">
          <v-chip-group
            v-model="selection"
            active-class=" accent-4 white--text"
            column
          >
            <v-chip v-for="(like, index) in this.partner.likes" :key="index">{{
              like
            }}</v-chip>
          </v-chip-group>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>
        <p style="margin-bottom: 1%">Das kann dein Wichtel gar nicht leiden</p>
        <v-card-text style="margin-top: -5px">
          <v-chip-group
            v-model="selection"
            active-class=" accent-4 white--text"
            column
          >
            <v-chip
              color=""
              v-for="(dislike, index) in this.partner.dislikes"
              :key="index"
              >{{ dislike }}</v-chip
            >
          </v-chip-group>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <p style="margin-bottom: 1%">Adressdaten</p>

        <body-2 class="font-weight-light">
          {{ this.partner.firstname }} {{ this.partner.lastname }}
        </body-2>
        <v-spacer></v-spacer>
        <body-2 class="font-weight-light"> {{ this.partner.street }} </body-2>
        <v-spacer></v-spacer>
        <body-2 class="font-weight-light">
          {{ this.partner.city }} {{ this.partner.zip }}
        </body-2>
       <v-divider class="mx-4"></v-divider>
      </v-card >
    </v-overlay>
    <div class="container">
      <div class="row">
        <div v-for="member in memberlist" :key="member.username">
          <member-card :image="member.image" :username="member.username">
          </member-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MemberCard from "../components/Card/MemberCard.vue";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";
export default {
  data() {
    return {
      memberlist: [],
      groupstatus: "Gruppen status",
      userstatus: false,
      wichtelstarted: false,
      userID: "",
      overlay: false,
      disabled: false,
      panel: [0, 1],
      partner: {
        username: "",
        firstname: "",
        lastname: "",
        street: "",
        zip: "",
        city: "",
        image: "",
        likes: [],
        dislikes: [],
      },
    };
  },
  components: {
    MemberCard,
  },
  props: {
    groupId: {
      type: String,
    },
  },
  methods: {
    startWichteln() {
      this.$axios.post("/gift/startWichteln", { groupId: this.groupId }).then(
        (response) => {
          if (response.status === 201) {
            swal({
              title: "WUHU",
              text:
                "Die Verlosung wurde gestartet! Alle Wichtel erhalten nun ihre Partner per E-Mail",
            });
          }
        },
        (error) => {
          if (error.response.status === 403) {
            swal({
              title: "Oh nein ",
              text: error.response.data.message,
            });
          }
        }
      );
    },
    getPartner() {
      console.log(this.groupId + "  " + this.userID);
      this.$axios
        .get("/gift/getPartner", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          params: {
            groupID: this.groupId,
            userID: this.userID,
          },
        })
        .then((response) => {
          this.overlay = true;
          this.partner = response.data;
          console.log(response.data);
        });
    },
  },
  created() {
    this.userID = jwt_decode(localStorage.getItem("user"))._id;
    if (this.groupId) {
      this.$axios
        .get("/group/" + this.groupId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          params: {
            uID: this.userID,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.memberlist = response.data[0].groupmembers;
          this.userstatus = response.data[0].userPerm;
          if (!response.data[0].groupstatus) {
            this.groupstatus = "Wichteln noch nicht gestartet  :(";
          } else {
            this.wichtelstarted = true;
            this.groupstatus = "Wichteln wurde gestartet ! <3";
          }
        });
    } else {
      this.$router.push("home");
    }
  },
};
</script>
<style scoped>
.row {
  margin-top: 5px;
}

.btn-start {
  background-color: #32394f;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 32px;
}
.groupstatus {
  margin-bottom: 10px;
}
.hr {
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}
.v-card__text {
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
}

.col1 {
  float: left;
  width: 50%;
}

.overlay-btn {
  background-color: "#32394f";
}

.close {
  position: absolute;
  top: 4%;
  left: 89%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  padding: 12px 24px;
  cursor: pointer;
  background-color: #555;
  color: white;
  font-size: 16px;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  border: none;
}

@media only screen and (max-width: 480px) {
  .row {
    margin-top: 20px;
    margin-right: 10px;
    margin-left: 10px;
  }
}
/* Custom, iPhone Retina */

@media only screen and (max-width: 320px) {
}
</style>