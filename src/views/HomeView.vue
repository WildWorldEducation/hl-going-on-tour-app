<script>
// Import the store.
import { useSessionDetailsStore } from '../stores/SessionDetailsStore.js'

export default {
  setup() {
    const sessionDetailsStore = useSessionDetailsStore();
    return {
      sessionDetailsStore
    }
  },
  created() {
    console.log("is admin: " + this.sessionDetailsStore.isAdmin)
  }
}
</script>

<template>
  <main>
    home
  </main>
</template>
