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
    <nav id="navbar" class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <RouterLink to="/" class="nav-link">
          <img src="/images/ontour-logo.png" alt="" width="50" height="50">
        </RouterLink>
        <span class="navbar-brand">Healthy Lifestyles: Going On Tour</span>

        <button v-if="sessionDetailsStore.isLoggedIn == true" @click="LogOut()" class="btn btn-dark">Logout
        </button>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
#navbar {
  background-color: #0f3a53;
  color: #FCFF71;
}

.navbar-brand {
  color: white;
  font-family: 'Angkor';
  font-weight: 400;
}

/* Screen smaller than 600px - 1 column */
@media (max-width: 599px) {
  .navbar-brand {
    display: none;
  }
}
</style>
