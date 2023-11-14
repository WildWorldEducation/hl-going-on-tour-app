<script setup>

import { ref } from 'vue'
import { launch } from '../game/game.js';
import { pleaseRotate } from '../game/scenes/util/pleaserotate.js';

// binds to the v-if on our button to toggle visibility
const showButton = ref(true)

function handleClickStart() {
    // hides launch button
    showButton.value = false;

    // Runs the launch function
    launch();

    // To make sure orientation is correct.
    pleaseRotate()
}

</script>

<template>
    <div id="game">
        <button v-if="showButton" @click="handleClickStart" class="btn btn-light">Start</button>
    </div>
</template>

<style scoped>
#game {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-family: 'Angkor';
}

#game button {
    background-color: #0f3a53;
    color: #FCFF71;
}
</style>
