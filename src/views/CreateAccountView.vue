<script>

export default {
    setup() {
    },
    data() {
        return {
        };
    },
    created() {

    },
    methods: {
        ValidateForm() {
            let firstName = document.getElementById("first_name").value;
            let lastName = document.getElementById("last_name").value;
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            let email = document.getElementById("email").value;

            if (firstName == "" || firstName == null) {
                alert("Please add a first name.")
            }
            else if (lastName == "" || lastName == null) {
                alert("Please add a last name.")
            }
            else if (username == "" || username == null) {
                alert("Please add a username.")
            }
            else if (password == "" || password == null) {
                alert("Please add a password.")
            }
            else if (email == "" || email == null) {
                alert("Please add an email address.")
            }
            else {
                this.ValidateEmail();
            }
        },
        ValidateEmail() {
            let email = document.getElementById("email").value;
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                this.Submit()
            } else {
                alert("Please enter a valid email address")
            }
        },
        Submit() {
            let firstName = document.getElementById("first_name").value;
            let lastName = document.getElementById("last_name").value;
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            let email = document.getElementById("email").value;

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
                        username: username,
                        password: password,
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        current_date: currentDate
                    })
            };
            var url = '/users/api/create-account';
            fetch(url, requestOptions)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    // Let user know if username or email address is already taken.
                    if (data.notification == "username already exists" ||
                        data.notification == "email address already exists") {
                        alert(data.notification);
                    }
                    else if (data.notification == "account created") {
                        alert(data.notification);
                        window.location.href = '../';
                    }
                })
        }
    }
}
</script> 

<template>
    <div class="login-page">
        <div class="container form-signin my-1">
            <h1>Create Account</h1>
            <div class="mb-3">
                <label for="first_name" class="form-label">First Name</label>
                <input id="first_name" type="text" class="form-control">
            </div>
            <div class="mb-3">
                <label for="last_name" class="form-label">Last Name</label>
                <input id="last_name" type="text" class="form-control">
            </div>
            <div class="mb-3">
                <label class="form-label">Username</label>
                <input id="username" type="text" class="form-control">
            </div>
            <div class="mb-3">
                <label class="form-label">Password</label>
                <input id="password" type="password" class="form-control">
            </div>
            <div class="mb-3">
                <label class="form-label">Email address</label>
                <input id="email" type="email" class="form-control" @blur="ValidateEmail">
            </div>
            <button class="btn btn-dark" @click="ValidateForm()">Submit</button>
        </div>
    </div>
</template>

<style scoped>
.login-page {
    height: 100%;
    background-image: url("../images/login-background.jpg");
    background-size: cover;
}

.form-signin {
    background-color: #0f3a53;
    color: #fcfeca;
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
    border: 1px solid black;
    border-radius: 25px;
}
</style> 