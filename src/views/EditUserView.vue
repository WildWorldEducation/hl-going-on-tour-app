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
            userId: this.$route.params.id,
            user: {},
        };
    },
    created() {
        this.getUser();
    },
    methods: {
        getUser() {
            fetch('/users/api/' + this.userId)
                .then(function (response) {
                    return response.json();
                }).then(data => this.user = data).
                then(() => {
                    this.user.originalUsername = this.user.username
                    this.user.originalEmail = this.user.email
                })
        },
        ValidateForm() {
            if (this.user.first_name == "" || this.user.first_name == null) {
                alert("Please add a first name.")
            }
            else if (this.user.last_name == "" || this.user.last_name == null) {
                alert("Please add a last name.")
            }
            else if (this.user.username == "" || this.user.username == null) {
                alert("Please add a username.")
            }
            else if (this.user.email == "" || this.user.email == null) {
                alert("Please add an email address.")
            }
            else {
                this.Submit();
            }
        },
        ValidateEmail() {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email)) {
            } else {
                alert("Please enter a valid email address")
            }
        },
        Submit() {
            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        firstname: this.user.first_name,
                        lastname: this.user.last_name,
                        username: this.user.username,
                        email: this.user.email,
                        password: this.user.password,
                        original_username: this.user.originalUsername,
                        original_email: this.user.originalEmail
                    })
            };

            var url = '/users/api/' + this.userId + '/edit';
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
        },
    }
}
</script> 

<template>
    <div class="container user-form mt-3">
        <h1>Edit User</h1>
        <div class="mb-3">
            <label for="firstname" class="form-label">First name</label>
            <input v-model="user.first_name" type="text" class="form-control">
        </div>
        <div class="mb-3">
            <label for="lastname" class="form-label">Last name</label>
            <input v-model="user.last_name" type="text" class="form-control">
        </div>
        <div class="mb-3">
            <label class="form-label">Username</label>
            <input v-model="user.username" type="text" class="form-control">
        </div>
        <div class="mb-3">
            <label class="form-label">Email address</label>
            <input v-model="user.email" type="email" class="form-control" @blur="ValidateEmail">
        </div>
        <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="user.password" type="text" class="form-control">
        </div>

        <div class="d-flex justify-content-end">
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