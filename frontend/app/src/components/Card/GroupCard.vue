<template>
  <div class="card" style="width: 20rem">
    <div class="avatar">
      <img
        src="https://porta.imgix.net/medias/sys_porta/images/h4b/he6/weihnachtsglanz-by-casanova-deko-wichtel-stille-nacht-i-35-cm-1200x1200-0140565.04-0.jpg?auto=format&ar=1%3A1&fit=crop&ixlib=react-9.0.2&h=1134&w=1134"
        alt="Circle Image"
        class="img-card"
      />
    </div>
    <div>
      <h4 class="card-title">{{ groupname }}</h4>
      <p :style="style">Wichteln gestartet: {{ groupstatus }}</p>
      <p class="card-user-count">Mitglieder: {{ usercount }}</p>

      <div>
        <button class="btn-primary" @click="goToGroup()">
          Zur Wichtelgruppe
        </button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      data: "",
      statustex :""
    };
  },
  name: "group-card",
  props: {
    groupId: String,
    groupname: String,
    usercount: Number,
    groupstatus: Boolean,
    groupdescription: String,
    imgSrc: String,
  },
  computed: {
    style() {
      if (this.groupstatus) {
        return "color: " + "green";
      } else {
        return "color: " + "red";
      }
    },
  },

  methods: {
   
    goToGroup() {
      this.$router.push({ name: "group", params: { groupId: this.groupId } });
    },
  },
};
</script>
<style scoped>
.card-title {
  margin-top: 15px;
  margin-bottom: 15px;
  color: white;
  text-align: center;
}

.btn-primary {
  width: auto;
  height: auto;
  background: #757ca3c5;
  position: relative;

  border-radius: 32px;

  padding: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}

.card-user-count {
  color: rgba(255, 255, 255, 0.678);
}
.btn-primary:hover {
  background: #757ca3;
}
.img-card {
  border-radius: 50%;
  width: 100px;
  margin-top: -75px;
  box-shadow: 10px 10px 5px #2020205e;
  -moz-box-shadow: 0px 10px 5px #2020205e;
  -webkit-box-shadow: 5px 5px 5px #2020205e;
  -khtml-box-shadow: 10px 10px 5px #2020205e;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  background: hsla(229, 22%, 10%, 0.631);
  padding: 40px;
  float: left;
  margin-right: 10%;
  margin-left: 50px;
  margin-top: 50px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

@media only screen and (max-width: 480px) {
  .card {
    margin-left: 75px;
  }
}
</style>