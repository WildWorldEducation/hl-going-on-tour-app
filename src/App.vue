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
        <RouterLink to="/" class="nav-link">
        </RouterLink>
        <span class="navbar-brand">Healthy Lifestyles: Going On Tour</span>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          </ul>
          <ul class="navbar-nav d-flex">
            <li class="nav-item me-2">
              <button v-if="sessionDetailsStore.isLoggedIn == true" @click="LogOut()" class="btn btn-dark">Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
