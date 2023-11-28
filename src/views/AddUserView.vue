<script>
// Import the store.
import { useUsersStore } from '../stores/UsersStore.js'

export default {
    setup() {
        const usersStore = useUsersStore();
        return {
            usersStore
        }
    },
    data() {
        return {
            user: {
                firstName: null,
                lastName: null,
                username: null,
                email: null,
                password: null
            }
        }
    },
    async created() {

    },
    methods: {
        ValidateForm() {
            if (this.user.firstName == "" || this.user.firstName == null) {
                alert("Please add a first name.")
            }
            else if (this.user.lastName == "" || this.user.lastName == null) {
                alert("Please add a last name.")
            }
            else if (this.user.username == "" || this.user.username == null) {
                alert("Please add a username.")
            }
            else if (this.user.password == "" || this.user.password == null) {
                alert("Please add a password.")
            }
            else if (this.user.email == "" || this.user.email == null) {
                alert("Please add an email address.")
            }
            else {
                this.ValidateEmail();
            }
        },
        ValidateEmail() {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email)) {
                this.Submit()
            } else {
                alert("Please enter a valid email address")
            }
        },
        Submit() {
            // Get current date.
            var date_time = new Date();
            let date = ("0" + date_time.getDate()).slice(-2);
            let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
            let year = date_time.getFullYear();
            var currentDate = year + "-" + month + "-" + date;

            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        username: this.user.username,
                        password: this.user.password,
                        first_name: this.user.firstName,
                        last_name: this.user.lastName,
                        email: this.user.email,
                        current_date: currentDate
                    })
            };
            var url = '/users/api/add';
            fetch(url, requestOptions)
                .then(function (response) {
                    return response.json()
                })
                .then((data) => {
                    // Let user know if username or email address is already taken.
                    if (data.notification == "username already taken" ||
                        data.notification == "email already taken") {
                        alert(data.notification);
                    }
                    else {
                        alert(data.notification);
                        this.usersStore.getUsers()
                        this.$router.push("/");
                    }
                })
        }
    }
}
</script>

<template>
    <div class="container user-form my-1">
        <h1>Create Account</h1>
        <div class="mb-3">
            <label for="first_name" class="form-label">First Name</label>
            <input v-model="user.firstName" type="text" class="form-control">
        </div>
        <div class="mb-3">
            <label for="last_name" class="form-label">Last Name</label>
            <input v-model="user.lastName" type="text" class="form-control">
        </div>
        <div class="mb-3">
            <label class="form-label">Username</label>
            <input v-model="user.username" type="text" class="form-control">
        </div>
        <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="user.password" type="password" class="form-control">
        </div>
        <div class="mb-3">
            <label class="form-label">Email address</label>
            <input v-model="user.email" type="email" class="form-control">
        </div>
        <div class="d-flex justify-content-between">
            <router-link class="btn btn-dark" to="/">
                Cancel
            </router-link>
            <button class="btn btn-dark" @click="ValidateForm()">Submit</button>
        </div> 
    </div>
</template>

<style scoped>
.user-form {
    background-color: #0f3a53;
    color: #fcfeca;
    width: 100%;
    max-width: 600px;
    padding: 15px;
    margin: 0 auto;
    border: 1px solid black;
    border-radius: 25px;
    font-family: 'Angkor', serif;
}
</style>
