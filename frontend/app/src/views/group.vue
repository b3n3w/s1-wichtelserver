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
    <button  class="btn-start" v-show="wichtelstarted" @click="getPartner()">
      Zeige mir meinen Wichtel
    </button>
    <v-overlay :absolute="absolute" :value="overlay">
      <v-card>
        <h2>{{ this.partner.username }}</h2>
        <v-expansion-panel v-model="panel" :disabled="disabled" multiple>
          <v-expansion-panel-header>Zeige Adressdaten</v-expansion-panel-header>
          <v-expansion-panel-content> Some content </v-expansion-panel-content>
        </v-expansion-panel>
      </v-card>
      <v-btn color="success" @click="overlay = false"> Hide Overlay </v-btn>
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
          this.partner.username = response.data.username;
          console.log(response.data);
        });
    },
  },
  created() {
    console.log(this.groupId);
    this.userID = jwt_decode(localStorage.getItem("jwt"))._id;
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
  margin-top: 10px;
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