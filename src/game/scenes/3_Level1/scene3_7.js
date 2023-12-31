import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import BackButton from '../Custom_Classes/BackButton.js';

export default class Scene3_7 extends Phaser.Scene {
    constructor() {
        super('Scene3_7');
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
        this.load.video('vid3-3', 'assets/Videos/3_Level1/scene3-vid3.mp4');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module3');
            this.music.loop = true
        }
        else {
            this.music.pause();
        }

        // Video.
        this.vid = this.add.video(0, 0, 'vid3-3');
        // this.vid.on('complete', () => {
        //     this.music.play()
        //     this.music.setVolume(0.1);
        // });
        this.vid.setOrigin(0)
        this.vid.play();

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            if (!this.music.isPlaying) {
                this.music.play();
                this.music.setVolume(0.1);
            }

            this.scene.start("Scene3_8", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_6", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40
        // Save user progress.
        const save = new SaveProgress(this);

        /** 
       * This is the Loading Bar for the video scene\
       * If it look does not align with the design. Comment the below code block
       * */

        this.progressBar = this.add.graphics();
    }

    /**
        * This is the Loading Bar for the video scene\
        * If it look does not align with the design. Comment the below code block
        * */
    update() {
        this.progressBar.clear();

        // Width of progressBar is the game width 
        const size = 1920;
        /** 
         * In Update we just rerender the rectangle width based on video progress
        */
        this.progressBar.fillStyle(0x004aad);
        this.progressBar.fillRect(0, 1080 - 10, size * this.vid.getProgress(), 10);
    }
}