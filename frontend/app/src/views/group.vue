<template>
  <div>
    <div class="groupstatus">
      <h3>{{ groupstatus }}</h3>
    </div>
    <button class="btn-start" v-show="userstatus" @click="startWichteln()">Starte Wichteln</button>
    <div class="container">
      <div class="row">
        <div
          class="col-md-8"
          v-for="member in memberlist"
          :key="member.username"
          
        >
          <member-card 
          :image="member.image"
          :username="member.username"> </member-card>
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
      userstatus: false
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
              text: "Die Verlosung wurde gestartet! Alle Wichtel erhalten nun ihre Partner per E-Mail",
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
  },
  created() {
    console.log(this.groupId);
    let uID = jwt_decode(localStorage.getItem("jwt"))._id;
    if (this.groupId) {
      this.$axios
        .get("/group/" + this.groupId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          params: {
            uID: uID
          }
        })
        .then((response) => {
          console.log(response.data);
          this.memberlist = response.data[0].groupmembers;
          this.userstatus = response.data[0].userPerm;
          if (!response.data[0].groupstatus) {
            this.groupstatus = "Das Wichteln wurde noch nicht gestartet";
          } else {
            this.groupstatus = "Das Wichteln wurde gestartet ! <3";
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

.btn-start{
  background-color: #32394f;
  color: white;
  padding: 5px;
  border: none;
  border-radius:32px 

}
.groupstatus {
  margin-bottom: 10px;
}
/* Large Devices, Wide Screens */

@media only screen and (max-width: 1281px) {
}

@media only screen and (max-width: 1100px) {
}

/* Medium Devices, Desktops */

@media only screen and (max-width: 992px) {
}

/* Small Devices, Tablets */

@media only screen and (max-width: 768px) {
}

/* Extra Small Devices, Phones */

/*OnePlus*/

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