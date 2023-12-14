import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import CloseButton from '../Custom_Classes/CloseButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene4_8 extends Phaser.Scene {
    constructor() {
        super('Scene4_8');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Music.
        this.load.audio("nyc-song", ["assets/Audio/Music/4_Level2/nyc-song.mp3"]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        //Sprites        
        this.load.image('x-mark', 'assets/Images/General/x-mark.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('bg-4-8', 'assets/Images/4_Level2/madison-square.jpg');
        this.load.image('lights-4-8', 'assets/Images/4_Level2/lights.png');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('nyc-song');
            this.music.play();
            this.music.loop = true
        }

        // For needing to click the "Next" button twice to proceed.
        this.clicks = 0;

        // BG.
        var bg = this.add.sprite(0, 0, 'bg-4-8').setOrigin(0)

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 850, 150, 32);
        this.titleText = this.add.text(55, 75,
            `Welcome to NYC's Madison Square Garden!`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Text.
        this.text = this.add.text(940, 480,
            `Madison Square Garden is a 20,000+ seat
venue. It is home to the New York Knicks
Basketball team and the New York Rangers
Hockey Team. It also hosts many musical acts.`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5
        this.text.alpha = 0


        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.text.alpha = 1
            if (this.clicks == 1) {
                this.text.setText(`Many artists have performed at "The Garden"
including: Jay-Z, Justin Bieber, Taylor Swift,
Twenty One Pilots, Beyonce, Michael Buble,
Harry Styles and so many more.`)

                var lights = this.add.sprite(0, 0, 'lights-4-8').setOrigin(0)
            }
            else if (this.clicks == 2) {
                this.scene.start("Scene4_9", { music: this.music });
            }
            this.clicks++
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_7");
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}