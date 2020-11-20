<template>
  <div @click="goToGroup()" class="group-card">
    <p class="card-header">{{ groupname }}</p>
    <p>Description: {{ groupdescription }}</p>
  </div>
</template>


<script>
export default {
  name: "group-card",
  props: {
    groupname: String,
    groupdescription: String,
  },
  methods: {
    goToGroup() {
        console.log("Öffne Dich")
    },
  },
};
</script>
<style scoped>
.group-card {
  width: 50%;
  background-color: rgba(255, 255, 255, 0.562);
  border-radius: 10%;
  margin: auto;
  margin-top: 20px;
  padding: 10px;
}
.group-card :hover {
  background-color: rgba(255, 255, 255, 0.747);
}
.card-header {
  text-align: center;
  font-size: 20px;
}
</style>