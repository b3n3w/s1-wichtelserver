<template>
  <div>
    <h4 class="member-name">{{ username }}</h4>
    <button>Zeige Wichtel</button>
  </div>
</template>

<script>
export default {
  name: "member-card",
  props: {
    username: String,
  },
};
</script>
<style scoped>
</style>