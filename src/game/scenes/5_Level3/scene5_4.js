import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js';


export default class Scene5_4 extends Phaser.Scene {
    constructor() {
        super('Scene5_4');
    }
    preload() {
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);

        // Sprites.
        this.load.image('wood-bg', 'assets/Images/5_Level3/letter-scene/wood-bg.png');
        this.load.image('envelope', 'assets/Images/5_Level3/letter-scene/envelope.png');
        this.load.image('stamp1.png', 'assets/Images/5_Level3/letter-scene/stamp1.png');
        this.load.image('stamp2.png', 'assets/Images/5_Level3/letter-scene/stamp2.png');
        this.load.image('stamp3.png', 'assets/Images/5_Level3/letter-scene/stamp3.png');
        this.load.image('stamp4.png', 'assets/Images/5_Level3/letter-scene/stamp4.png');
        this.load.image('stamp5.png', 'assets/Images/5_Level3/letter-scene/stamp5.png');
        this.load.image('stamp6.png', 'assets/Images/5_Level3/letter-scene/stamp6.png');
        this.load.image('stamp7.png', 'assets/Images/5_Level3/letter-scene/stamp7.png');


    }

    create() {
        // City bg.
        const background = this.add.sprite(0, 0, 'wood-bg').setOrigin(0);
        background.width = this.sys.canvas.width;
        background.height = this.sys.canvas.height;

        // Envelope.
        var envelope = this.add.sprite(0, 0, 'envelope').setOrigin(0.5);
        envelope.x = this.cameras.main.width / 2
        envelope.y = this.cameras.main.height / 2 + 50
        envelope.setScale(0.9)

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.nextBtnAudio.play();
            this.scene.start("Scene5_5", { });
        }, this);
        nextBtn.y = nextBtn.y - 40;

        // Back button.
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.nextBtnAudio.play();
            this.scene.start("Scene5_3", { });
        }, this);
        backBtn.y = backBtn.y - 40;
    }
}