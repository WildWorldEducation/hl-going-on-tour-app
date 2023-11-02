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
            activeIndex: null
        }
    },
    async created() {
        // Run the GET request.
        if (this.usersStore.users.length < 1) {
            await this.usersStore.getUsers()
            this.activeIndex = this.usersStore.users[0]
        }
    },
    computed: {

    },
    methods: {
        toggle(user) {
            this.activeIndex = user
        },
        // changeUserId(userId) {
        //     this.$emit('changeUserId', userId)
        // }
    }
}
</script>

<template>
    <button class="user-block btn" :class="{ 'active': user == activeIndex }" v-for="(user) in usersStore.users"
        @click="toggle(user)">{{ user.username
        }}
    </button>
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

.active {
    border-color: #FCFF71;
    color: #FCFF71;
}
</style>
