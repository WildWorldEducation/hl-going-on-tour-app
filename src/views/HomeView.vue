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
    <div class="row">
      <div v-if="!this.sessionDetailsStore.isAdmin" class="row text-center mt-5">
        <h1>VISIT LEVELS</h1>
      </div>
      <div v-if="this.sessionDetailsStore.isAdmin" class="col-md-3">
        <div class="button-row">
          <router-link class="btn btn-dark" to="/users/add"> <!-- Plus sign -->
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
            <!-- X icon -->
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.312625 14.5205L4.83312 9.99999L0.312625 5.49218C0.111396 5.29025 -0.00159545 5.0168 -0.00159545 4.73172C-0.00159545 4.44665 0.111396 4.17319 0.312625 3.97126L3.96282 0.312625C4.16474 0.111396 4.4382 -0.00159545 4.72327 -0.00159545C5.00835 -0.00159545 5.2818 0.111396 5.48373 0.312625L9.99999 4.83312L14.5205 0.312625C14.6204 0.21056 14.7397 0.12947 14.8714 0.0741101C15.003 0.0187502 15.1444 -0.00976563 15.2873 -0.00976562C15.4301 -0.00976563 15.5715 0.0187502 15.7032 0.0741101C15.8349 0.12947 15.9541 0.21056 16.0541 0.312625L19.6874 3.96282C19.8886 4.16474 20.0016 4.4382 20.0016 4.72327C20.0016 5.00835 19.8886 5.2818 19.6874 5.48373L15.1669 9.99999L19.6874 14.5205C19.8883 14.7217 20.0012 14.9944 20.0012 15.2788C20.0012 15.5632 19.8883 15.836 19.6874 16.0372L16.0541 19.6874C15.8529 19.8883 15.5801 20.0012 15.2957 20.0012C15.0113 20.0012 14.7386 19.8883 14.5374 19.6874L9.99999 15.1669L5.49218 19.6874C5.29025 19.8886 5.0168 20.0016 4.73172 20.0016C4.44665 20.0016 4.17319 19.8886 3.97126 19.6874L0.312625 16.0541C0.21056 15.9541 0.12947 15.8349 0.0741101 15.7032C0.0187502 15.5715 -0.00976563 15.4301 -0.00976562 15.2873C-0.00976563 15.1444 0.0187502 15.003 0.0741101 14.8714C0.12947 14.7397 0.21056 14.6204 0.312625 14.5205Z"
                fill="white" />
            </svg>
          </button>
        </div>
        <StudentList @changeUserId="changeUserId($event)" />
      </div>
      <div :class="{ 'col-md-9': this.sessionDetailsStore.isAdmin }" style="height:calc(90vh-54px)">
        <div class="row grid-cards mt-3">
          <div id="module-1" class="grid-card level-button-outer"
            :class="{ 'completed': this.m1Status == 'completed', 'in-progress': this.m1Status == 'in progress', 'not-started': this.m1Status == 'not started' }">
            <a v-if="this.sessionDetailsStore.isAdmin" class="level-button-inner
              module-1-unlocked"><span>Intro<br>&<br>Prelude</span></a>
            <a v-else class="level-button-inner module-1-unlocked"
              href="/game?resume=scene1_1"><span>Intro<br>&<br>Prelude</span></a>
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
            <a v-else class="level-button-inner thumbnail" href="/game?resume=scene4_1"></a>
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
            <a v-else class="level-button-inner thumbnail" href="/game?resume=scene5_1"></a>
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
            <a v-else class="level-button-inner thumbnail" href="/game?resume=scene7_1"></a>
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
            <a v-else class="level-button-inner thumbnail" href="/game?resume=scene8_1"></a>
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
  justify-content: space-between;
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

/* Screen smaller than 600px - 1 column */
@media (max-width: 599px) {
  .grid-cards {
    display: block;
  }

  .grid-card {
    margin: auto;
  }

  #resumeGameLink {
    margin-bottom: 15px;
  }

  #module-1 span {
    font-size: 4.5vh;
    line-height: 1;
  }
}

/* Screen larger than 600px - 2 columns */
@media (min-width: 600px) {
  .grid-cards {
    grid-template-columns: repeat(2, 1fr);
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

  #module-1 span {
    font-size: 4.5vh;
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

#module-2 a {
  background-image: url("/images/getting-ready-level-thumbnail.jpg");
}

#module-3 a {
  background-image: url("/images/nyc-level-thumbnail.jpg");
}

#module-4 a {
  background-image: url("/images/chicago-level-thumbnail.jpg");
}

#module-5 a {
  background-image: url("/images/on-the-way-level-thumbnail.jpg");
}

#module-6 a {
  background-image: url("/images/las-vegas-level-thumbnail.jpg");
}

#module-7 a {
  background-image: url("/images/california-level-thumbnail.jpg");
}

#module-8 a {
  background-image: url("/images/check-it-level-thumbnail.jpg");
}

#module-9 a {
  background-image: url("/images/encore-level-thumbnail.jpg");
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
