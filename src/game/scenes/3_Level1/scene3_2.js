import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_2 extends Phaser.Scene {
    constructor() {
        super('Scene3_2');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Module music.
        this.load.audio('theme-module3', 'assets/Audio/Music/3_Level1/theme-module3.mp3');
        // Audio.
        this.load.audio("next-button", "assets/Audio/SFX/General/next-button.mp3");
        // Sprites.
        this.load.image('bg-shape1', 'assets/Images/3_Level1/bg-shapes/bg-shape1.png');
        this.load.image('bg-shape2', 'assets/Images/3_Level1/bg-shapes/bg-shape2.png');
        this.load.image('bg-shape3', 'assets/Images/3_Level1/bg-shapes/bg-shape3.png');
        this.load.image('bg-shape4', 'assets/Images/3_Level1/bg-shapes/bg-shape4.png');
        this.load.image('text-card1', 'assets/Images/3_Level1/bg-shapes/text-card2.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module3');
            this.music.play();
            this.music.loop = true
            this.music.setVolume(0.1);
        }

        // BG.
        this.cameras.main.setBackgroundColor("#f9f2e8");

        // Right corner shape.
        var bgShape1 = this.add.sprite(0, 0, 'bg-shape1').setOrigin(0.0);
        bgShape1.x = 1920 - 640
        bgShape1.y = 1080 - 700

        // Top left corner.
        var bgShape3 = this.add.sprite(0, 0, 'bg-shape3').setOrigin(0.0);
        bgShape3.x = 0
        bgShape3.y = 0

        // Green shape.
        var bgShape2 = this.add.sprite(0, 0, 'bg-shape2').setOrigin(0.5);
        bgShape2.alpha = 0.8
        bgShape2.x = 420
        bgShape2.y = 700

        // Notes
        var bgShape4 = this.add.sprite(0, 0, 'bg-shape4').setOrigin(0.5);
        bgShape4.scale = 1.5
        bgShape4.x = 500
        bgShape4.y = this.cameras.main.height / 2 + 40

        // Text box
        var textBox = this.add.sprite(0, 0, 'text-card1').setOrigin(0.5);
        textBox.x = 1320
        textBox.y = this.cameras.main.height / 2

        // Content text.
        this.contentText = this.add.rexBBCodeText(1320, this.cameras.main.height / 2,
            `Music has many genres, or types of\nmusic. It is also common for one\ntype of genre to influence new
versions of songs and music.\n
Think about your [b]favorite genres of\nmusic[/b]. You may even prefer\ndifferent genres for certain days of\nthe week, or during certain activities,
like when you study.
            `,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.5, 0.5);
        // Dealing with text quality.
        this.contentText.scale = 0.5

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene3_3", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_1", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 270, 150, 32);
        this.instructionText = this.add.text(55, 75, "Genres",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.instructionText.scale = 0.5
        this.instructionTextCtnr = this.add.container(0, 55, [this.textBg, this.instructionText]);

        // Save user progress.
        const save = new SaveProgress(this)
    }
}