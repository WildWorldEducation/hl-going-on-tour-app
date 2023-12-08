import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'

export default class Scene5_0 extends Phaser.Scene {
    constructor() {
        super('Scene5_0');

    }
    preload() {
        // Sprites.        
        this.load.image('chicago-bg', 'assets/Images/5_Level3/chicago-level.jpg');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
    }

    create() {
        // BG.
        var bg = this.add.sprite(0, 0, 'chicago-bg').setOrigin(0);

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene5_1");
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_24");
        }, this);
        backBtn.y = backBtn.y - 40
    }
}