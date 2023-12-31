import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_45 extends Phaser.Scene {
    constructor() {
        super('Scene3_45');
    }

    init(data) {
        this.music = data.music;
    }
    preload() {
        // Module music.
        this.load.audio('theme-module3', [
            'assets/Audio/Music/3_Level1/theme-module3.mp3',
        ]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('new-york3-45-1', 'assets/Images/3_Level1/new-york/new-york1.png');
        this.load.image('new-york3-45-2', 'assets/Images/3_Level1/new-york/new-york2.png');
        // Video.
        this.load.video('vid22', 'assets/Videos/3_Level1/scene3-vid22.mp4');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module3');
            this.music.play();
            this.music.setVolume(0.1);
            this.music.loop = true
        }

        // Video.
        const vid = this.add.video(0, 0, 'vid22');
        vid.setOrigin(0)
        vid.play();

        // NewYork sprite
        const newYork1 = this.add.sprite(930, 580, 'new-york3-45-1').setOrigin(0.5).setAlpha(0).setScale(1.2);
        const newYork2 = this.add.sprite(920, 590, 'new-york3-45-2').setOrigin(0.5).setAlpha(0).setScale(1.2);

        this.tweens.chain({
            tweens: [
                {
                    targets: newYork1,
                    alpha: 1,
                    duration: 800,
                    delay: 3800
                },
                {
                    targets: newYork2,
                    alpha: 1,
                    duration: 800,
                    delay: 400
                }
            ]
        })

        // Next button.     
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.music.stop()
            this.scene.start("Scene4_1");
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_44", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}