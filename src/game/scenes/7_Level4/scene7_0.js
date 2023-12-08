import UnlockModule from '../Custom_Classes/UnlockModule.js'
import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import BackButton from '../Custom_Classes/BackButton.js'

export default class Scene7_0 extends Phaser.Scene {
    constructor() {
        super('Scene7_0');
    }
    preload() {
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);

        // Sprites.        
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('las-vegas-bg', '/assets/Images/7_Level4/vegas-level.jpg');
    }

    create() {
        // Background Sprite
        var vegasLevel = this.add.sprite(0, 0, 'las-vegas-bg').setOrigin(0);

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_1", { music: this.music });
        }, this);


        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_24");
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);
    }
}