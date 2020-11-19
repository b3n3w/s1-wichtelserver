<template>
  <div>
    <p>Bitte wähle deine Gruppe</p>
    <button @click="createGroup()">Neue Wichtel Gruppe erstellen</button>
  </div>
</template>
<script>

export default {
  data() {

    return {};
  },
  created() {
   // Get all listed Groups 
  },
  methods: {
    createGroup() {
        console.log("ok")
       this.$router.push("/createGroup");
    },
  },
};
</script>
<style scoped>
</style>