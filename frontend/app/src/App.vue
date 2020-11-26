<template>
  <div id="app">
    <v-app app style="background: rgba(0, 0, 0, 0)">
      <nav v-if="!['setup', 'index'].includes($route.name)">
      <Navigationbar />
      </nav>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-app>
  </div>
</template>
<script>
import Navigationbar from "./components/Navigationbar";
export default {
  components: {
    Navigationbar,
  },
};
</script>
<style >
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.1s ease;
}

.fade-leave {
}

.fade-leave-active {
  transition: opacity 0.1s ease;
  opacity: 0;
}
</style>
