<template>
  <div>
    <Menu />
    <li
      class="li-members"
      v-for="member in memberlist"
      :key="member.username"
    >
      <member-card :username="member.username"> </member-card>
    </li>
  </div>
</template>

<script>
import Menu from "@/components/Menu";
import MemberCard from "../components/Card/MemberCard.vue";
export default {
  data() {
    return {
      memberlist: [
      ],
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
  created() {
    console.log(this.groupId);
    this.$axios
      .get("/group/" + this.groupId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((response) => {
        let members = response.data.groupmembers;
        
        members.forEach(element => {
         this.memberlist.push({username: element.username})
        });
      });
  },
};
</script>
<style scoped>
</style>