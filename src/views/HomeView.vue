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
      m3: null,
      m4: null,
      m5: null,
      m6: null,
      m7: null,
      m8: null,
      m9: null,
      m10: null,
    }
  },
  components: {
    StudentList
  },
  mounted() {
    // Get the buttons.
    this.resume = document.getElementById("resumeGameLink")
    this.m3 = document.getElementById("module-3")
    this.m4 = document.getElementById("module-4")
    this.m5 = document.getElementById("module-5")
    this.m6 = document.getElementById("module-6")
    this.m7 = document.getElementById("module-7")
    this.m8 = document.getElementById("module-8")
    this.m9 = document.getElementById("module-9")
    this.m10 = document.getElementById("module-10")

    // Get the student's id.
    const url1 = '/api/user-details';
    fetch(url1)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Find out the student's progress through the game.
        const url2 = '/api/user-progress/' + data.userId;
        fetch(url2)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            // Set the link for where the game should resume from.
            this.resume.href = "/game?resume=" + data.last_slide

            if (data.module_unlocked >= 3) {
              this.m3.classList.add("module-3-unlocked");
              this.m3.href = "/game?resume=scene3_1"
            }
            if (data.module_unlocked >= 4) {
              this.m4.classList.add("module-4-unlocked");
              this.m4.href = "/game?resume=scene4_1"
            }
            if (data.module_unlocked >= 5) {
              this.m5.classList.add("module-5-unlocked");
              this.m5.href = "/game?resume=scene5_1"
            }
            if (data.module_unlocked >= 6) {
              this.m6.classList.add("module-6-unlocked");
              this.m6.href = "/game?resume=scene6_1"
            }
            if (data.module_unlocked >= 7) {
              this.m7.classList.add("module-7-unlocked");
              this.m7.href = "/game?resume=scene7_1"
            }
            if (data.module_unlocked >= 8) {
              this.m8.classList.add("module-8-unlocked");
              this.m8.href = "/game?resume=scene8_1"
            }
            if (data.module_unlocked >= 9) {
              this.m9.classList.add("module-9-unlocked");
              this.m9.href = "/game?resume=scene9_1"
            }
            if (data.module_unlocked >= 10) {
              this.m10.classList.add("module-10-unlocked");
              this.m10.href = "/game?resume=scene10_1"
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    changeUserId(user) {
      console.log(user)
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
        <div class="grid-card resume-button-outer">
          <a id="resumeGameLink" class="resume-button-inner" href="#"><span>Resume game</span></a>
        </div>
        <div class="grid-card resume-button-outer">
          <router-link id="restart-link" class="resume-button-inner" to="/game?resume=Scene1_1"><span>Restart
              game</span></router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-if="!this.sessionDetailsStore.isAdmin" class="row text-center">
        <h1>VISIT LEVELS</h1>
      </div>
      <div v-if="this.sessionDetailsStore.isAdmin" class="col-md-3">
        <!-- <StudentList @changeUserId="changeUserId($event)" /> -->
        <StudentList @changeUserId="changeUserId($event)" />
      </div>
      <div :class="{ 'col-md-9': this.sessionDetailsStore.isAdmin }">
        <div class="row grid-cards mt-3">
          <div class="grid-card level-button-outer">
            <a id="module-1" class="level-button-inner module-1-unlocked"
              href="/game?resume=Scene1_1"><span>Intro<br>&<br>Prelude</span></a>



          </div>
          <div class="grid-card level-button-outer">
            <a id="module-3" class="level-button-inner thumbnail">
            </a>
          </div>
          <div class="grid-card level-button-outer">
            <a id="module-4" class="level-button-inner thumbnail">
            </a>
          </div>
          <div class="grid-card level-button-outer">
            <a id="module-5" class="level-button-inner thumbnail">
            </a>
          </div>


          <div class="grid-card level-button-outer">
            <a id="module-6" class="level-button-inner thumbnail">
            </a>
          </div>
          <div class="grid-card level-button-outer">
            <a id="module-7" class="level-button-inner thumbnail">
            </a>
          </div>
          <div class="grid-card level-button-outer">
            <a id="module-8" class="level-button-inner thumbnail">
            </a>
          </div>
          <div class="grid-card level-button-outer">
            <a id="module-9" class="level-button-inner thumbnail">
            </a>
          </div>
          <div class="grid-card level-button-outer">
            <a id="module-10" class="level-button-inner thumbnail">
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Page level */

/* main {
  height: 100%;
} */

.dashboard {
  background-image: url("/images/dash-background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  font-family: 'Angkor', serif;
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
  margin-bottom: 50px;
  justify-content: center;
}


.grid-card {
  width: 300px;
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

.module-1 {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.thumbnail {
  background-repeat: no-repeat;
  background-size: cover;
}

#module-3 {
  background-image: url("/images/getting-ready-level-thumbnail.jpg");
}

#module-4 {
  background-image: url("/images/nyc-level-thumbnail.jpg");
}

#module-5 {
  background-image: url("/images/chicago-level-thumbnail.jpg");
}

#module-6 {
  background-image: url("/images/on-the-way-level-thumbnail.jpg");
}

#module-7 {
  background-image: url("/images/las-vegas-level-thumbnail.jpg");
}

#module-8 {
  background-image: url("/images/california-level-thumbnail.jpg");
}

#module-9 {
  background-image: url("/images/check-it.jpg");
}

#module-10 {
  background-image: url("/images/encore.jpg");
}


/* Hover state for unlocked button */
#resumeGameLink:hover,
#restart-link:hover,
.module-1-unlocked:hover,
.module-2-unlocked:hover,
.module-3-unlocked:hover,
.module-4-unlocked:hover,
.module-5-unlocked:hover,
.module-6-unlocked:hover,
.module-7-unlocked:hover,
.module-8-unlocked:hover,
.module-9-unlocked:hover,
.module-10-unlocked:hover {
  /* 50% opacity */
  background-color: #4c90f780;
  border-color: #FCFF71;
}

.level-button-outer {
  aspect-ratio: 16 / 9;
}

#resumeGameLink {
  color: #62FB5F;
  border: 4px solid #62FB5F;
}

#restart-link {
  color: #ED6A6A;
  border: 4px solid #ED6A6A;
}

.level-button-inner {
  display: block;
  border: 4px solid white;
  border-radius: 25px;
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  background-color: #4C90F733;
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
