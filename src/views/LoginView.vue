<script>
import router from "../router";

export default {
    data() {
        return {
            username: null,
            password: null
        }
    },
    methods: {
        LoginAttempt() {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        username: this.username,
                        password: this.password,
                    })
            };
            var url = '/api/login-attempt';

            fetch(url, requestOptions)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    if (data.account == "authorized") {
                        router.push({ name: "home" });
                    }
                    else if (data.account == "wrong-password") {
                        alert("wrong password")
                    }
                    else {
                        alert("no account")
                    }
                })
        }
    }
}
</script>

<template>
    <div class="login-page">
        <div class="form-signin my-1">
            <img class="mb-4" src="/images/ontour-logo.png" alt="" width="250" height="250">
            <!-- Login with Google -->
            <div id="g_id_onload" data-client_id="309231279221-r46j4e6utpo00t2292rlpgmeifu3foob.apps.googleusercontent.com"
                data-context="signin" data-ux_mode="popup" data-login_uri="/api/google-login-attempt"
                data-auto_prompt="false">
            </div>
            <div class="g_id_signin" data-type="standard" data-shape="rectangular" data-theme="filled_blue"
                data-text="signin_with" data-size="large" data-logo_alignment="left">
            </div>
            <!-- Login with username and password -->
            <div class="mb-3 mt-3 text-start">
                <!-- <img class="me-1" src="images/icons/user-solid.svg" alt="" width="16" height="16"> -->
                <label for="username" class="form-label">Username</label>
                <input type="text" v-model="username" placeholder="Username" class="form-control" required>
            </div>
            <div class="mb-3 text-start">
                <!-- <img class="me-1" src="images/icons/lock-solid.svg" alt="" width="16" height="16"> -->
                <label for="password" class="form-label">Password</label>
                <input type="password" v-model="password" placeholder="Password" class="form-control" required>
            </div>
            <button type="submit" @click="LoginAttempt()" class="btn btn-dark">Login</button>
            <p>&nbsp;</p>
            <p class="text-center">Don't have an account? <a href="create-account">Sign up</a></p>
        </div>
        <div class="mt-3 fixed-bottom" style="background-color: #0a659a; color: #fcfeca;border-color:#0a659a">
            <div class="accordion" id="accordionExample">
                <div>
                    <button style="background-color: #0f3a53; color: #fcfeca;" class="accordion-button" type="button"
                        data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true"
                        aria-controls="collapseOne">
                        Test Logins
                    </button>

                    <div id="collapseOne" style="border-color:#0a659a" class="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div class="row">
                                <div class="col">
                                    <h3 style="font-size: 14pt;">Student</h3>
                                    <p>username: "test-student"</p>
                                    <p>password : "password"</p>
                                    <p>Or, create your own account!</p>
                                </div>
                                <div class="col">
                                    <h3 style="font-size: 14pt;">Admin</h3>
                                    <p>username: "test-admin"</p>
                                    <p>password : "password"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

/* Bootstrap class */
.accordion-button::after {
    filter: invert();
}
</style>