import Phaser from 'phaser'

// Welcome
import Scene1_1 from './scenes/1_Welcome/scene1_1.js'

let config = {
    type: Phaser.CANVAS,
    // Game size
    width: 1920,
    height: 1080,
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT,
    },
    audio: {
        disableWebAudio: true
    },

    scene: Scene1_1
};

let game = new Phaser.Game(config)

export default game;
