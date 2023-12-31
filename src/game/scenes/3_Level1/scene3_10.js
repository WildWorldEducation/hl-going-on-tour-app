import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_10 extends Phaser.Scene {
    constructor() {
        super('Scene3_10');
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
        // Sprites.
        this.load.image('char2_3-10', 'assets/Images/3_Level1/char2.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('text-card3-10', 'assets/Images/3_Level1/text-card1.png');
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

        // BG.
        this.cameras.main.setBackgroundColor("#959fe4");

        // Char.
        var char = this.add.sprite(0, 0, 'char2_3-10').setOrigin(0.5);
        char.x = this.cameras.main.width / 2 - 350
        char.y = this.cameras.main.height / 2 + 160
        char.setScale(1.6)

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene3_11", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_9", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40

        // Instructions.
        var instructionsBG = this.add.sprite(1275, 400, 'text-card3-10').setOrigin(0.5);
        instructionsBG.scale = 1
        this.instructionsText = this.add.rexBBCodeText(1275, 400,
            `You have the chance to win tickets\nto a national concert\ntour--with all expenses paid,\nincluding hotel and travel!
            
[b]Click on the Next button[/b] to enter the\ncompetition for free tickets!
            `,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.instructionsText.scale = 0.5

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 350, 150, 32);
        this.titleText = this.add.text(55, 75, "Enter to win!",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Save user progress.
        const save = new SaveProgress(this)
    }
}