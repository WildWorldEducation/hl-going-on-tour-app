<script>
// Import the users store.
import { useUsersStore } from '../stores/UsersStore'

export default {
    setup() {
        const usersStore = useUsersStore();
        return {
            usersStore
        }
    },
    data() {
        return {
        }
    },
    async created() {
        // Run the GET request.
        if (this.usersStore.users.length < 1)
            this.usersStore.getUsers()
    },
    computed: {

    },
    methods: {
        changeUserId(userId) {
            this.$emit('changeUserId', userId)
        }
    }
}
</script>

<template>
    <button class="user-block btn" v-for="user in usersStore.users">{{ user.username }}</button>
</template>

<style scoped>
.user-block {
    width: 220px;
    height: 80px;
    border-radius: 8px;
    border: 2px solid white;
    margin-top: 10px;
    color: white;
}
</style>
