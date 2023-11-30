import WideButton from '../Custom_Classes/WideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_36 extends Phaser.Scene {
    constructor() {
        super('Scene3_36');
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
        this.load.image('bg', 'assets/Images/3_Level1/notes-bg.png');
        this.load.image('notes-bg', 'assets/Images/3_Level1/notes-bg.png');
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

        var isCorrect = false

        // BG.
        this.cameras.main.setBackgroundColor("#959fe4");
        var bg = this.add.sprite(0, 0, 'notes-bg').setOrigin(0);
        bg.alpha = 0.5

        // Header.
        var header = this.add.graphics();
        header.fillStyle(0xffffff, 1);
        header.fillRoundedRect(260, 320, 1380, 140, 72);
        var headerText = this.add.text(960, 390,
            `Federal law states that you have to be at least _____ years old
to purchase tobacco and vaping products?`,
            { fontFamily: "Arial", fontSize: "84px", fill: "#000000", align: "center" });
        headerText.setOrigin(0.5).setScale(0.5)
        headerText.alpha = 1

        // Button 1.
        var btn1Graphic = this.add.graphics();
        btn1Graphic.fillStyle(0xffffff, 1);
        btn1Graphic.fillRoundedRect(0, 0, 690, 120, 8);
        const btn1Border = this.add.graphics();
        btn1Border.lineStyle(5, '0x87d1ff');
        btn1Border.strokeRoundedRect(0, 0, 690, 120, 8);
        btn1Border.setAlpha(0)
        var btn1Text = this.add.text(100, 60, "A. 18", { fontFamily: "Arial", fontSize: "72px", fill: "#000000" });
        btn1Text.setOrigin(0.5).setScale(0.5)
        btn1Text.alpha = 1
        var btn1 = this.add.container(260, 480, [btn1Graphic, btn1Text, btn1Border]);
        btn1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 690, 120), Phaser.Geom.Rectangle.Contains);
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
            isCorrect = false
            btn1Border.setAlpha(1)
            btn2Border.setAlpha(0)
            btn3Border.setAlpha(0)
            btn4Border.setAlpha(0)
        }, this);
        btn1Graphic.alpha = 1

        // Button 2.
        var btn2Graphic = this.add.graphics();
        btn2Graphic.fillStyle(0xffffff, 1);
        btn2Graphic.fillRoundedRect(0, 0, 690, 120, 8);
        const btn2Border = this.add.graphics();
        btn2Border.lineStyle(5, '0x87d1ff');
        btn2Border.strokeRoundedRect(0, 0, 690, 120, 8);
        btn2Border.setAlpha(0)
        var btn2Text = this.add.text(100, 60, "B. 19", { fontFamily: "Arial", fontSize: "72px", fill: "#000000" });
        btn2Text.setOrigin(0.5).setScale(0.5)
        btn2Text.alpha = 1
        var btn2 = this.add.container(960, 480, [btn2Graphic, btn2Text, btn2Border]);
        btn2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 690, 120), Phaser.Geom.Rectangle.Contains);
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
            isCorrect = false
            btn1Border.setAlpha(0)
            btn2Border.setAlpha(1)
            btn3Border.setAlpha(0)
            btn4Border.setAlpha(0)
        }, this);
        btn2Graphic.alpha = 1

        // Button 3.
        var btn3Graphic = this.add.graphics();
        btn3Graphic.fillStyle(0xffffff, 1);
        btn3Graphic.fillRoundedRect(0, 0, 690, 120, 8);
        const btn3Border = this.add.graphics();
        btn3Border.lineStyle(5, '0x87d1ff');
        btn3Border.strokeRoundedRect(0, 0, 690, 120, 8);
        btn3Border.setAlpha(0)
        var btn3Text = this.add.text(100, 60, "C. 20", { fontFamily: "Arial", fontSize: "72px", fill: "#000000" });
        btn3Text.setOrigin(0.5).setScale(0.5)
        btn3Text.alpha = 1
        var btn3 = this.add.container(260, 620, [btn3Graphic, btn3Text, btn3Border]);
        btn3.setInteractive(new Phaser.Geom.Rectangle(0, 0, 690, 120), Phaser.Geom.Rectangle.Contains);
        btn3.on('pointerover', function () {
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        btn3.on('pointerout', function () {
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });
        btn3.on('pointerdown', function () {
            isCorrect = false
            btn1Border.setAlpha(0)
            btn2Border.setAlpha(0)
            btn3Border.setAlpha(1)
            btn4Border.setAlpha(0)
        }, this);
        btn3Graphic.alpha = 1

        // Button 4.
        var btn4Graphic = this.add.graphics();
        btn4Graphic.fillStyle(0xffffff, 1);
        btn4Graphic.fillRoundedRect(0, 0, 690, 120, 8);
        const btn4Border = this.add.graphics();
        btn4Border.lineStyle(5, '0x87d1ff');
        btn4Border.strokeRoundedRect(0, 0, 690, 120, 8);
        btn4Border.setAlpha(0)
        var btn4Text = this.add.text(100, 60, "D. 21", { fontFamily: "Arial", fontSize: "72px", fill: "#000000" });
        btn4Text.setOrigin(0.5).setScale(0.5)
        btn4Text.alpha = 1
        var btn4 = this.add.container(960, 620, [btn4Graphic, btn4Text, btn4Border]);
        btn4.setInteractive(new Phaser.Geom.Rectangle(0, 0, 690, 120), Phaser.Geom.Rectangle.Contains);
        btn4.on('pointerover', function () {
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        btn4.on('pointerout', function () {
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });
        btn4.on('pointerdown', function () {
            isCorrect = true
            btn1Border.setAlpha(0)
            btn2Border.setAlpha(0)
            btn3Border.setAlpha(0)
            btn4Border.setAlpha(1)
        }, this);
        btn4Graphic.alpha = 1

        // Submit button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const submitBtn = new WideButton(this, 0, 0, 'Submit', this.nextBtnAudio);
        submitBtn.on('pointerdown', function () {
            if (isCorrect) {
                this.scene.start("Scene3_36_correct", { music: this.music });
            }
            else {
                this.scene.start("Scene3_36_incorrect", { music: this.music });
            }
        }, this);
        submitBtn.x = 960 - 130
        submitBtn.y = 1080 - 150

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_35");
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}