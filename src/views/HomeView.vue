<script>
// Import the store.
import { useSessionDetailsStore } from '../stores/SessionDetailsStore.js'
import { useUsersStore } from '../stores/UsersStore.js'

import StudentList from '../components/StudentList.vue'

export default {
  setup() {
    const sessionDetailsStore = useSessionDetailsStore();
    const usersStore = useUsersStore();
    return {
      sessionDetailsStore, usersStore
    }
  },
  data() {
    return {
      user: {
        id: null,
      },
      resume: null,
      m1Status: 'not started',
      m2Status: 'not started',
      m3Status: 'not started',
      m4Status: 'not started',
      m5Status: 'not started',
      m6Status: 'not started',
      m7Status: 'not started',
      m8Status: 'not started',
      m9Status: 'not started',
      isStudentList: true
    }
  },
  components: {
    StudentList
  },
  async created() {
    // Populate the stores, if they arent already.
    if (this.sessionDetailsStore.userId == undefined) {
      await this.sessionDetailsStore.getSessionDetails()
    }
    if (this.usersStore.users.length < 1) {
      await this.usersStore.getUsers()
    }

    // If user is not admin, set up for their progress.
    if (!this.sessionDetailsStore.isAdmin) {
      this.changeUserId(this.sessionDetailsStore.userId)
    }
  },
  methods: {
    changeUserId(userId) {
      this.user.id = userId

      // Get the correct user.
      for (let i = 0; i < this.usersStore.users.length; i++) {
        // Reset for each student.
        if (this.usersStore.users[i].id == userId) {

          this.m1Status = 'in progress'
          this.m2Status = 'not started'
          this.m3Status = 'not started'
          this.m4Status = 'not started'
          this.m5Status = 'not started'
          this.m6Status = 'not started'
          this.m7Status = 'not started'
          this.m8Status = 'not started'
          this.m9Status = 'not started'

          // M3 unlocked
          if (this.usersStore.users[i].module_unlocked > 1) {
            this.m1Status = 'completed'
            this.m2Status = 'in progress'
            // M4 unlocked
            if (this.usersStore.users[i].module_unlocked > 3) {
              this.m2Status = 'completed'
              this.m3Status = 'in progress'
              // M5 unlocked
              if (this.usersStore.users[i].module_unlocked > 4) {
                this.m3Status = 'completed'
                this.m4Status = 'in progress'
                // M6 unlocked
                if (this.usersStore.users[i].module_unlocked > 5) {
                  this.m4Status = 'completed'
                  this.m5Status = 'in progress'
                  // M7 unlocked
                  if (this.usersStore.users[i].module_unlocked > 6) {
                    this.m5Status = 'completed'
                    this.m6Status = 'in progress'
                    // M8 unlocked
                    if (this.usersStore.users[i].module_unlocked > 7) {
                      this.m6Status = 'completed'
                      this.m7Status = 'in progress'
                      // M9 unlocked
                      if (this.usersStore.users[i].module_unlocked > 8) {
                        this.m7Status = 'completed'
                        this.m8Status = 'in progress'
                        // M10 unlocked
                        if (this.usersStore.users[i].module_unlocked > 9) {
                          this.m8Status = 'completed'
                          this.m9Status = 'in progress'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    async deleteUser() {
      await this.usersStore.deleteUser(this.user.id)
      this.usersStore.getUsers()
    },
    showStudentList() {
      this.isStudentList = true
    },
    showStudentProgress() {
      this.isStudentList = false
    }
  }
}
</script>

<template>
  <main class="dashboard container-fluid">
    <div v-if="!this.sessionDetailsStore.isAdmin" class="row">
      <div class="row text-center mt-3">
        <h1>RESUME GAME</h1>
      </div>
      <div class="row grid-cards">
        <div id="resumeGameLink" class="grid-card resume-button-outer">
          <a class="resume-button-inner" href="#"><span>Resume game</span></a>
        </div>
        <div class="grid-card resume-button-outer">
          <router-link id="restart-link" class="resume-button-inner" to="/game?resume=Scene1_1"><span>Restart
              game</span></router-link>
        </div>
      </div>
    </div>
    <button v-if="!isStudentList" @click="showStudentList()" class="btn btn-dark showStudentListBtn">back</button>
    <div class="row">
      <div v-if="!this.sessionDetailsStore.isAdmin" class="row text-center mt-5">
        <h1>VISIT LEVELS</h1>
      </div>

      <div v-if="this.sessionDetailsStore.isAdmin" class="col-md-3" :class="{ hideStudentList: !isStudentList }">
        <div class="button-row">
          <button id="progressButton" class="btn btn-dark" @click="showStudentProgress()">
            <!-- Eye icon -->
            <svg xmlns="http://www.w3.org/2000/svg" height="25" width="30"
              viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
                fill="white" />
            </svg>
          </button>
          <router-link class="btn btn-dark" to="/users/add">
            <!-- Plus sign -->
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.34811 20.0423L6.34811 13.6494L-0.0358702 13.6583C-0.320945 13.6579 -0.594203 13.5444 -0.795782 13.3428C-0.997361 13.1412 -1.11082 12.868 -1.11132 12.5829L-1.11729 7.41477C-1.1168 7.1297 -1.00334 6.85644 -0.801757 6.65486C-0.600179 6.45328 -0.326921 6.33982 -0.0418461 6.33933L6.3481 6.34231L6.3481 -0.0506238C6.34659 -0.193451 6.3736 -0.335145 6.42756 -0.467396C6.48152 -0.599646 6.56134 -0.719794 6.66234 -0.820794C6.76334 -0.921794 6.88349 -1.00161 7.01574 -1.05557C7.14799 -1.10953 7.28969 -1.13655 7.43251 -1.13503L12.5827 -1.12308C12.8678 -1.12259 13.141 -1.00913 13.3426 -0.807549C13.5442 -0.60597 13.6577 -0.332713 13.6582 -0.047637L13.6552 6.34231L20.0481 6.34231C20.3325 6.34248 20.6052 6.45552 20.8063 6.65661C21.0074 6.8577 21.1204 7.13039 21.1206 7.41477L21.1325 12.565C21.1324 12.8494 21.0193 13.122 20.8182 13.3231C20.6171 13.5242 20.3444 13.6373 20.0601 13.6374L13.6552 13.6494L13.6641 20.0334C13.6636 20.3184 13.5502 20.5917 13.3486 20.7933C13.147 20.9948 12.8738 21.1083 12.5887 21.1088L7.43252 21.1267C7.28969 21.1282 7.148 21.1012 7.01575 21.0473C6.88349 20.9933 6.76335 20.9135 6.66235 20.8125C6.56135 20.7115 6.48153 20.5913 6.42757 20.4591C6.37361 20.3268 6.34659 20.1851 6.34811 20.0423Z"
                fill="white" />
            </svg>
          </router-link>
          <router-link class="btn btn-dark" :to="'/users/edit/' + this.user.id">
            <!-- Pencil icon -->
            <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.75558 19.3181C0.77635 19.5132 0.87137 19.6928 1.02096 19.8198C1.17055 19.9468 1.36325 20.0114 1.55915 20.0002L5.27701 19.8288L0.398438 15.6145L0.75558 19.3181Z"
                fill="white" />
              <path d="M11.8467 2.24484L0.801758 15.0315L5.6802 19.2454L16.7251 6.45877L11.8467 2.24484Z" fill="white" />
              <path
                d="M18.2555 3.11796L14.934 0.260817C14.832 0.172259 14.7134 0.104756 14.5852 0.0621907C14.4569 0.0196256 14.3215 0.00283902 14.1868 0.0127967C14.052 0.0227543 13.9205 0.0592596 13.7999 0.120212C13.6793 0.181165 13.572 0.265362 13.484 0.36796L12.4805 1.50725L17.359 5.71439L18.3519 4.56082C18.5289 4.35602 18.6181 4.08969 18.6 3.81958C18.582 3.54948 18.4582 3.29738 18.2555 3.11796Z"
                fill="white" />
            </svg>
          </router-link>
          <button class="btn btn-danger" @click="deleteUser()">
            <!-- Trash icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20"
              viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
              <path fill="white"
                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
          </button>
        </div>
        <StudentList @changeUserId="changeUserId($event)" />
      </div>
      <div :class="{ 'col-md-9': this.sessionDetailsStore.isAdmin, 'hideStudentProgress': isStudentList }"
        style="height:calc(90vh-54px)">
        <div class="row grid-cards mt-3">
          <div id="module-1" class="grid-card level-button-outer"
            :class="{ 'completed': this.m1Status == 'completed', 'in-progress': this.m1Status == 'in progress', 'not-started': this.m1Status == 'not started' }">
            <a v-if="this.sessionDetailsStore.isAdmin" class="level-button-inner
              module-1-unlocked"></a>
            <a v-else class="level-button-inner module-1-unlocked" href="/game?resume=scene1_1"></a>
            <p>{{ m1Status }}</p>
          </div>
          <div id="module-2" class="grid-card level-button-outer"
            :class="{ 'completed': this.m2Status == 'completed', 'in-progress': this.m2Status == 'in progress', 'not-started': this.m2Status == 'not started' }">
            <a v-if="this.sessionDetailsStore.isAdmin || this.m2Status == 'not started'"
              class="level-button-inner thumbnail">
              <svg v-if="!this.sessionDetailsStore.isAdmin" class="lock-icon" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path fill="#FFF"
                  d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
              </svg>
            </a>
            <a v-else class="level-button-inner thumbnail" href="/game?resume=scene3_1"></a>
            <p>{{ m2Status }}</p>
          </div>
          <div id="module-3" class="grid-card level-button-outer"
            :class="{ 'completed': this.m3Status == 'completed', 'in-progress': this.m3Status == 'in progress', 'not-started': this.m3Status == 'not started' }">
            <a v-if="this.sessionDetailsStore.isAdmin || this.m3Status == 'not started'"
              class="level-button-inner thumbnail">
              <svg v-if="!this.sessionDetailsStore.isAdmin" class="lock-icon" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path fill="#FFF"
                  d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
              </svg>
            </a>
            <a v-else class="level-button-inner thumbnail" href="/game?resume=scene4_0"></a>
            <p>{{ m3Status }}</p>
          </div>
          <div id="module-4" class="grid-card level-button-outer"
            :class="{ 'completed': this.m4Status == 'completed', 'in-progress': this.m4Status == 'in progress', 'not-started': this.m4Status == 'not started' }">
            <a v-if="this.sessionDetailsStore.isAdmin || this.m4Status == 'not started'"
              class="level-button-inner thumbnail">
              <svg v-if="!this.sessionDetailsStore.isAdmin" class="lock-icon" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path fill="#FFF"
                  d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
              </svg>
            </a>
            <a v-else class="level-button-inner thumbnail" href="/game?resume=scene5_0"></a>
            <p>{{ m4Status }}</p>
          </div>
          <div id="module-5" class="grid-card level-button-outer"
            :class="{ 'completed': this.m5Status == 'completed', 'in-progress': this.m5Status == 'in progress', 'not-started': this.m5Status == 'not started' }">
            <a v-if="this.sessionDetailsStore.isAdmin || this.m5Status == 'not started'"
              class="level-button-inner thumbnail">
              <svg v-if="!this.sessionDetailsStore.isAdmin" class="lock-icon" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path fill="#FFF"
                  d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
              </svg>
            </a>
            <a v-else class="level-button-inner thumbnail" href="/game?resume=scene6_1"></a>
            <p>{{ m5Status }}</p>
          </div>
          <div id="module-6" class="grid-card level-button-outer"
            :class="{ 'completed': this.m6Status == 'completed', 'in-progress': this.m6Status == 'in progress', 'not-started': this.m6Status == 'not started' }">
            <a v-if="this.sessionDetailsStore.isAdmin || this.m6Status == 'not started'"
              class="level-button-inner thumbnail">
              <svg v-if="!this.sessionDetailsStore.isAdmin" class="lock-icon" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path fill="#FFF"
                  d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
              </svg>
            </a>
            <a v-else class="level-button-inner thumbnail" href="/game?resume=scene7_0"></a>
            <p>{{ m6Status }}</p>
          </div>
          <div id="module-7" class="grid-card level-button-outer"
            :class="{ 'completed': this.m7Status == 'completed', 'in-progress': this.m7Status == 'in progress', 'not-started': this.m7Status == 'not started' }">
            <a v-if="this.sessionDetailsStore.isAdmin || this.m7Status == 'not started'"
              class="level-button-inner thumbnail">
              <svg v-if="!this.sessionDetailsStore.isAdmin" class="lock-icon" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path fill="#FFF"
                  d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
              </svg>
            </a>
            <a v-else class="level-button-inner thumbnail" href="/game?resume=scene8_0"></a>
            <p>{{ m7Status }}</p>
          </div>
          <div id="module-8" class="grid-card level-button-outer"
            :class="{ 'completed': this.m8Status == 'completed', 'in-progress': this.m8Status == 'in progress', 'not-started': this.m8Status == 'not started' }">
            <a v-if="this.sessionDetailsStore.isAdmin || this.m8Status == 'not started'"
              class="level-button-inner thumbnail">
              <svg v-if="!this.sessionDetailsStore.isAdmin" class="lock-icon" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path fill="#FFF"
                  d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
              </svg>
            </a>
            <a v-else class="level-button-inner thumbnail" href="/game?resume=scene9_1"></a>
            <p>{{ m8Status }}</p>
          </div>
          <div id="module-9" class="grid-card level-button-outer"
            :class="{ 'completed': this.m9Status == 'completed', 'in-progress': this.m9Status == 'in progress', 'not-started': this.m9Status == 'not started' }">
            <a v-if="this.sessionDetailsStore.isAdmin || this.m9Status == 'not started'"
              class="level-button-inner thumbnail">
              <svg v-if="!this.sessionDetailsStore.isAdmin" class="lock-icon" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path fill="#FFF"
                  d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
              </svg>
            </a>
            <a v-else class="level-button-inner thumbnail" href="/game?resume=scene10_1"></a>
            <p>{{ m9Status }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.button-row {
  display: flex;
  justify-content: space-evenly;
}

.lock-icon {
  width: 15%;
  opacity: 100%;
}

.not-started p {
  color: white;
}

.in-progress a {
  border-color: #FCFF71;
}

.in-progress p {
  color: #FCFF71;
}

.completed a {
  border-color: #58EC79;
}

.completed p {
  color: #58EC79;
}

.in-progress a:hover,
.completed a:hover {
  /* 50% opacity */
  background-color: #4c90f780;
  border-color: #FCFF71;
}

/* main {
  height: 100%;
} */

.dashboard {
  background-image: url("/images/dash-background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  font-family: 'Angkor', serif;
  height: calc(100% - 58px);
  overflow-y: auto;
}

.dashboard h1 {
  color: #FCFF71;
  font-size: 64px;
}

#module-1 span {
  font-size: 4.5vh;
  line-height: 1;
}

/* Cards */
.grid-cards {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
  justify-content: center;
}


.grid-card {
  width: 100%;
}

.grid-card p {
  text-align: center;
}

.showStudentListBtn {
  display: none;
}

#progressButton {
  display: none;
}


/* Screen smaller than 600px - 1 column */
@media (max-width: 599px) {
  .grid-cards {
    display: block;
  }

  .grid-card {
    margin: auto;
    font-size: 10vw;
  }

  #resumeGameLink {
    margin-bottom: 15px;
  }

  #module-1 span {
    font-size: 4.5vh;
    line-height: 1;
  }

  .hideStudentList {
    display: none;
  }

  .hideStudentProgress {
    display: none;
  }

  .showStudentListBtn {
    display: block;
  }

  #progressButton {
    display: block;
  }

}


/* Screen larger than 600px - 2 columns */
@media (min-width: 600px) {
  .grid-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid-card {
    margin: auto;
    font-size: 5vw;
  }

  #module-1 span {
    font-size: 3.5vh;
  }
}

/* Screen larger than 900px - 3 columns */
@media (min-width: 900px) {
  .grid-cards {
    grid-template-columns: repeat(3, 1fr);
  }

  .grid-card {
    margin: auto;
    font-size: 3vw;
  }


  #module-1 span {
    font-size: 3vw;
    line-height: 1;
  }
}

.resume-button-outer {
  max-width: 300px;
  aspect-ratio: 16 / 9;
}

.resume-button-inner {
  display: block;
  border-radius: 25px;
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  background-color: #4C90F733;
}

.thumbnail {
  background-repeat: no-repeat;
  background-size: cover;
}

#module-1 a {
  background-image: url("/images/intro-and-prelude-level-thumbnail.jpg");
  background-position: center;
}

#module-2 a {
  background-image: url("/images/getting-ready-level-thumbnail.jpg");
  background-position: center;
}

#module-3 a {
  background-image: url("/images/nyc-level-thumbnail.jpg");
  background-position: center;
}

#module-4 a {
  background-image: url("/images/chicago-level-thumbnail.jpg");
  background-position: center;
}

#module-5 a {
  background-image: url("/images/on-the-way-level-thumbnail.jpg");
  background-position: center;
}

#module-6 a {
  background-image: url("/images/vegas-level-thumbnail.jpg");
  background-position: center;
}

#module-7 a {
  background-image: url("/images/california-level-thumbnail.jpg");
  background-position: center;
}

#module-8 a {
  background-image: url("/images/check-it-level-thumbnail.jpg");
  background-position: center;
}

#module-9 a {
  background-image: url("/images/encore-level-thumbnail.jpg");
  background-position: center;
}


/* Hover state for unlocked button */
#resumeGameLink a:hover,
#restart-link:hover {
  /* 50% opacity */
  background-color: #4c90f780;
  border-color: #FCFF71;
}

.level-button-outer {
  aspect-ratio: 16 / 9;
}

#resumeGameLink a {
  color: #62FB5F;
  border: 4px solid #62FB5F;
}

#restart-link {
  color: #ED6A6A;
  border: 4px solid #ED6A6A;
}

.level-button-inner {
  display: flex;
  border: 4px solid white;
  border-radius: 25px;
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  background-color: #4C90F733;
  justify-content: center;
}

.level-button-inner span,
.resume-button-inner span {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white
}
</style>
