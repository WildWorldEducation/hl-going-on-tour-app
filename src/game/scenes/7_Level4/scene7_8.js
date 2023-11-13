import UnlockModule from '../Custom_Classes/UnlockModule.js'
import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import game from '../main.js';

export default class Scene7_8 extends Phaser.Scene {
    constructor() {
        super('Scene7_8');
    }
    preload() {

        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // Video.
        this.load.video('vid7_8', '/assets/Videos/7_Level4/Scene7_8-vid.mp4');

        // // Module music.


        // // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);


        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');



    }

    create() {
        // Background

        this.cameras.main.setBackgroundColor("#000000"); // use a single color for background

        // Music
        // There no theme file 

        // Video
        this.vid = this.add.video(0, 0, 'vid7_8');
        this.vid.setOrigin(0)
        this.vid.play();





        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_9", { music: this.music });
        }, this);


        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene7_7");
        }, this);



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
        const size = game.config.width;


        /** 
         * In Update we just rerender the rectangle width based on video progress
        */
        this.progressBar.fillStyle(0x004aad);
        this.progressBar.fillRect(0, game.config.height - 10, size * this.vid.getProgress(), 10);
    }
}