import UnlockModule from '../Custom_Classes/UnlockModule.js'
import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import BackButton from '../Custom_Classes/BackButton.js'

export default class Scene8_0 extends Phaser.Scene {
    constructor() {
        super('Scene8_0');
    }
    preload() {
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);

        // Sprites.        
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('california-level', '/assets/Images/8_Level5/california-level.jpg');
        this.load.spritesheet('fullscreen', 'assets/UI/General/fullscreen.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        // Background Sprite
        var californiaLevel = this.add.sprite(0, 0, 'california-level').setOrigin(0);

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene8_1", { music: this.music });
        }, this);


        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene7_30");
        }, this);

        // Fullscreen mode.
        const button = this.add.image(1920 - 16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
        button.setFrame(1);
        this.scale.startFullscreen();
        button.on('pointerup', function () {
            if (this.scale.isFullscreen) {
                button.setFrame(0);
                this.scale.stopFullscreen();
            }
            else {
                button.setFrame(1);
                this.scale.startFullscreen();
            }
        }, this);

        // Unlock module.
        const unlock = new UnlockModule(8)
    }
}