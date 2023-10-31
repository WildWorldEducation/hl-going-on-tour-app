<script>
// Import the store.
import { useSessionDetailsStore } from '../stores/SessionDetailsStore.js'

import StudentList from '../components/StudentList.vue'

export default {
  setup() {
    const sessionDetailsStore = useSessionDetailsStore();
    return {
      sessionDetailsStore
    }
  },
  components: {
    StudentList
  },
  created() {
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
          <a id="restart-link" class="resume-button-inner" href="/game?resume=Scene1_1"><span>Restart
              game</span></a>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-if="!this.sessionDetailsStore.isAdmin" class="row text-center">
        <h1>VISIT LEVELS</h1>
      </div>
      <div v-if="this.sessionDetailsStore.isAdmin" class="col-md-3">
        <StudentList />
      </div>
      <div class="col-md-9">
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

main {
  height: 100%;
}

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
