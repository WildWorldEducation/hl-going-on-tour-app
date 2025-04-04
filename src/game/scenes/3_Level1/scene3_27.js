import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_27 extends Phaser.Scene {
    constructor() {
        super('Scene3_27');
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
        // Video.
        this.load.video('vid3-16', 'assets/Videos/3_Level1/scene3-vid16.mp4');
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
        const vid = this.add.video(0, 0, 'vid3-16');
        vid.setOrigin(0)
        vid.play();

        /** In This Scene The play book will automatically go to next scene after the video are done 
         * So We will have a on over event for the vid
        */
        vid.on("complete", () => {
            this.scene.start("Scene3_28", { music: this.music });
        });

        // // Next button.     
        // this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        // const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        // nextBtn.on('pointerdown', function () {
        //     this.scene.start("Scene3_28", { music: this.music });
        // }, this);
        // nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_26", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}