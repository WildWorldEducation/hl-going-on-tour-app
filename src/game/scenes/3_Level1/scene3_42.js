import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_42 extends Phaser.Scene {
    constructor() {
        super('Scene3_42');
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
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('myth-fact-quiz-bg', 'assets/Images/3_Level1/myth-fact-quiz/myth-fact-quiz-bg.jpg');
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
        var bg = this.add.sprite(0, 0, 'myth-fact-quiz-bg').setOrigin(0);

        this.questionText = this.add.text(960, 640,
            `Musicians drink plenty
of water to help
their vocal cords.`,
            { fontFamily: "Arial", fontSize: "78px", color: '#000000', align: "center" }).setOrigin(0.5);
        // Dealing with text quality.
        this.questionText.scale = 0.5

        // Button 1.
        var btn1Graphic = this.add.graphics();
        btn1Graphic.lineStyle(16, 0xffffff, 1);
        btn1Graphic.strokeRoundedRect(0, 0, 700, 150, 16);
        btn1Graphic.fillStyle(0x004aad, 1);
        btn1Graphic.fillRoundedRect(0, 0, 700, 150, 16);
        var btn1Text = this.add.rexBBCodeText(350, 75, "[b]Fact[/b]", { fontFamily: "Arial", fontSize: "84px", fill: "#ffffff" });
        btn1Text.setOrigin(0.5).setScale(0.5)
        var btn1 = this.add.container(220, 850, [btn1Graphic, btn1Text]);
        btn1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 700, 150), Phaser.Geom.Rectangle.Contains);
        btn1.on('pointerover', function () {
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        btn1.on('pointerout', function () {
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });
        btn1.on('pointerdown', function () {
            this.scene.start("Scene3_43", { music: this.music });
        }, this);

        // Button 2.
        var btn2Graphic = this.add.graphics();
        btn2Graphic.lineStyle(16, 0xffffff, 1);
        btn2Graphic.strokeRoundedRect(0, 0, 700, 150, 16);
        btn2Graphic.fillStyle(0x004aad, 1);
        btn2Graphic.fillRoundedRect(0, 0, 700, 150, 16);
        var btn2Text = this.add.rexBBCodeText(350, 75, "[b]Myth[/b]", { fontFamily: "Arial", fontSize: "84px", fill: "#ffffff" });
        btn2Text.setOrigin(0.5).setScale(0.5)
        var btn2 = this.add.container(1000, 850, [btn2Graphic, btn2Text]);
        btn2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 700, 150), Phaser.Geom.Rectangle.Contains);
        btn2.on('pointerover', function () {
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        btn2.on('pointerout', function () {
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });
        btn2.on('pointerdown', function () {
            this.scene.start("Scene3_43");
        }, this);

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_41");
        }, this);
        backBtn.y = backBtn.y - 40

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 400, 150, 32);
        this.titleText = this.add.text(55, 75, "Myth or Fact",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Save user progress.
        const save = new SaveProgress(this)
    }
}