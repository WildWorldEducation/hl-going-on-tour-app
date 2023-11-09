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
      <div id="" v-if="this.sessionDetailsStore.isAdmin" class="col-md-3">
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

.dashboard a,
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
}

/* Screen larger than 600px - 2 columns */
@media (min-width: 600px) {
  .grid-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Screen larger than 900px - 3 columns */
@media (min-width: 900px) {
  .grid-cards {
    grid-template-columns: repeat(3, 1fr);
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
  background-image: url("/images/check-it.jpg");
}

#module-9 a {
  background-image: url("/images/encore.jpg");
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
