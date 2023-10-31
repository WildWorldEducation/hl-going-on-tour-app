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
    <div v-for="user in usersStore.users">11</div>
    student list
</template>

<style scoped></style>
