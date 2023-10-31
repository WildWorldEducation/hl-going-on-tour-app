<script setup>
import { onMounted, onUnmounted } from 'vue'
//import type { Game } from 'phaser'

let gameInstance = null
const containerId = 'game-container'
const game = await import('@/game/game')

onMounted(() => {
    gameInstance = game
})

onUnmounted(() => {
    gameInstance?.destroy(false)
})
</script>

<template>
    <div :id="containerId" />
</template>
