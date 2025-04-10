import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene7_16_C1 extends Phaser.Scene {
    constructor() {
        super('Scene7_16_C1');
    }
    init(data) {
        this.music = data.music;
    }
    preload() {
        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Music.
        this.load.audio("las-vegas-song", ["assets/Audio/Music/7_Level4/las-vegas-song.mp3"]);
        // Video.
        this.load.video('vid7_16_C1', 'assets/Videos/7_Level4/Scene7_16/Scene7_16_C1-vid.mp4');
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module3');
            this.music.loop = true
            this.music.pause();
        }
        else {
            this.music.pause();
        }

        // Background

        this.cameras.main.setBackgroundColor("#000000"); // use a single color for background

        // Music
        // There no theme file 

        // Video
        this.vid = this.add.video(0, 0, 'vid7_16_C1');
        this.vid.setOrigin(0)
        this.vid.play();

        // Title.
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 570, 150, 32);
        this.tileText = this.add.text(75, 75, "3. Subliminal Marketing",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);


        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.music.resume()
            this.scene.start("Scene7_16_C2", { music: this.music });
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
        const size = 1920;


        /** 
         * In Update we just rerender the rectangle width based on video progress
        */
        this.progressBar.fillStyle(0x004aad);
        this.progressBar.fillRect(0, 1080 - 10, size * this.vid.getProgress(), 10);
    }
}