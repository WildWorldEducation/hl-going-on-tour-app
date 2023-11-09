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
        }
        // Set the first button to be selected on page load.
        this.activeIndex = this.usersStore.users[0]
        // Send data for the first student to the parent component.
        this.toggle(this.usersStore.users[0])
    },
    computed: {

    },
    methods: {
        toggle(user) {
            this.activeIndex = user
            this.$emit('changeUserId', user.id)
        },
    }
}
</script> 

<template>
    <div class="scroll">
        <button class="user-block btn" :class="{ 'active': user == activeIndex }" v-for="(user) in usersStore.users"
            @click="toggle(user)">{{ user.username
            }}
        </button>
    </div>
</template>  

<style scoped>
.scroll {
    overflow-y: auto;
    height: 100vh;
}

.user-block {
    width: 100%;
    height: 80px;
    border-radius: 8px;
    border: 2px solid white;
    margin-top: 10px;
    color: white;
}

.user-block:hover {
    border-color: #FCFF71;
    color: #FCFF71;
}

.active {
    border-color: #FCFF71;
    color: #FCFF71;
}
</style>
