<script>
import router from "./router";
import { RouterLink, RouterView } from 'vue-router'
// Import the store.
import { useSessionDetailsStore } from './stores/SessionDetailsStore.js'

export default {
  setup() {
    const sessionDetailsStore = useSessionDetailsStore();
    return {
      sessionDetailsStore
    }
  },
  methods: {
    LogOut() {
      this.sessionDetailsStore.isLoggedIn = false;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      var url = '/api/logout';
      fetch(url, requestOptions)
        .then(function (response) {
          router.push({ name: "login" });
        })
    }
  }
}
</script>

<template>
  <header v-if="sessionDetailsStore.isLoggedIn">
    <nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <span class="navbar-brand">Healthy Lifestyles: Going On Tour</span>
        <button v-if="sessionDetailsStore.isLoggedIn == true" @click="LogOut()" class="btn btn-dark">Logout
        </button>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
