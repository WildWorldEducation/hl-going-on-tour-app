import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import BackButton from '../Custom_Classes/BackButton.js'

export default class Scene4_25 extends Phaser.Scene {
    constructor() {
        super('Scene4_25');
    }
    init(data) {
        this.music = data.music;
    }
    preload() {

        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // Video.
        this.load.video('vid4-25', 'assets/Videos/4_Level2/vid4-7.mp4');

        // Music.
        this.load.audio("nyc-song", ["assets/Audio/Music/4_Level2/nyc-song.mp3"]);
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
        this.vid = this.add.video(0, 0, 'vid4-25');
        this.vid.setOrigin(0);
        this.vid.play();

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene4_26", { music: this.music });
        }, this);

        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_24", { music: this.music });
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);
    }
}