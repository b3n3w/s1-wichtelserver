<template>
  <div class="card" style="width: 20rem">
    <img
      slot="image"
      class="card-img-top"
      :src="'@/assets/form-v8.jpg'"
      alt="Card image cap"
    />
    <div>
      <h4 class="card-title">{{ groupname }}</h4>
      <p class="card-user-count">Aktive Wichtel: {{ usercount }}</p>
      <p class="card-text">{{ groupdescription }}</p>
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
    };
  },
  name: "group-card",
  props: {
    groupId: String,
    groupname: String,
    usercount: Number,
    groupdescription: String,
    imgSrc: String,
  },
  methods: {
    goToGroup() {
      this.$router.push({ name: 'group', params:{groupId: this.groupId}  });
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

.btn-primary:hover {
  background: #757ca3;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  background: #dfbac194;
  padding: 40px;
  margin: auto;
  float: left;
  margin-right: 10%;
  margin-top: 20px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>