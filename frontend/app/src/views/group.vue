<template>
  <div>
    <Menu />
    <div class="groupstatus">
      <h3>{{ groupstatus }}</h3>
    </div>
    <div class="container">
      <div class="row">
        <div
          class="col-md-8"
          v-for="member in memberlist"
          :key="member.username"
        >
          <member-card :username="member.username"> </member-card>
        </div>
      </div>
    </div>
    <button @click="startWichteln()">Starte Wichteln</button>
  </div>
</template>

<script>
import Menu from "@/components/Menu";
import MemberCard from "../components/Card/MemberCard.vue";
import swal from "sweetalert";
export default {
  data() {
    return {
      memberlist: [],
      groupstatus: "Gruppen status",
    };
  },
  components: {
    Menu,
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
          console.log(response);
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

    if (this.groupId) {
      this.$axios
        .get("/group/" + this.groupId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.memberlist = response.data[0].groupmembers;
          if (!response.data[0].groupstatus) {
            this.groupstatus = "Das Wichteln wurde noch nicht gestartet";
          } else {
            this.groupstatus = "Das Wichteln wurde gestartet ! <3";
          }
        });
    }else{
      this.$router.push('home')
    }
  },
};
</script>
<style scoped>
.row {
  margin-top: 10px;
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