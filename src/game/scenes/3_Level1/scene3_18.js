import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_18 extends Phaser.Scene {
    constructor() {
        super('Scene3_18');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Module music.
        this.load.audio('theme-module3', [
            'assets/Audio/Music/3_Level1/theme-module3.mp3',
        ]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        this.load.audio("music3-13", ["assets/Audio/Music/3_Level1/happy-tune.mp3"]);
        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('text-card3-13', 'assets/Images/3_Level1/text-card3.png');
        // Video.
        this.load.video('vid3-5', 'assets/Videos/3_Level1/scene3-vid5.mp4');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module3');
            this.music.setVolume(0.1);
            this.music.loop = true
        }
        else {
            this.music.pause();
        }

        // Video.
        const vid = this.add.video(0, 0, 'vid3-5');
        vid.setOrigin(0)
        vid.play();

        // Audio
        var happyTune = this.sound.add("music3-13", { loop: false });
        happyTune.on('complete', () => {
            this.music.resume();
            this.music.setVolume(0.1);
        });
        happyTune.play();

        // Next button.     
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            happyTune.stop()
            if (!this.music.isPlaying) {
                this.music.resume();
                this.music.setVolume(0.1);
            }
            this.scene.start("Scene3_19", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_17");
        }, this);
        backBtn.y = backBtn.y - 40

        // Instructions.
        var instructionsBG = this.add.sprite(1050, 200, 'text-card3-13').setOrigin(0.5);
        instructionsBG.scale = 1.2
        instructionsBG.alpha = 0.9
        this.instructionsText = this.add.rexBBCodeText(1050, 230,
            `[i]"In life, it's not where you go — it's who you travel with."[/i]

            [align=right]Charles M. Schulz[/align]

              `,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.instructionsText.scale = 0.5

        // Save user progress.
        const save = new SaveProgress(this)
    }
}