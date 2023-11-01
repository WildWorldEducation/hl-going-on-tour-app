import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import WideButton from '../Custom_Classes/WideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene4_9 extends Phaser.Scene {
    constructor() {
        super('Scene4_9');
    }
    preload() {
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        //Sprites        
        this.load.image('x-mark', 'assets/Images/General/x-mark.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('notes-bg', 'assets/Images/4_Level2/notes-bg.png');
    }

    create() {
        var isCorrect = false

        // BG.
        this.cameras.main.setBackgroundColor("#959fe4");
        var bg = this.add.sprite(0, 0, 'notes-bg').setOrigin(0);
        bg.alpha = 0.5

        // Header.
        var header = this.add.graphics();
        header.fillStyle(0xffffff, 1);
        header.fillRoundedRect(960 - 740, 150, 1520, 210, 72);
        var headerText = this.add.text(960 - 740, 175,
            `Fun Fact: Justin Bieber claims the record for selling out Madison Square
Garden the fastest of any artist. Two shows for his Believe tour sold out in 30
seconds! Who do you think held the record before Justin Bieber?`,
            { fontFamily: "Arial", fontSize: "84px", fill: "#000000", align: "center" });
        headerText.setOrigin(0).setScale(0.5)
        headerText.alpha = 1

        // Button 1.
        var btn1Graphic = this.add.graphics();
        btn1Graphic.fillStyle(0xffffff, 1);
        btn1Graphic.fillRoundedRect(0, 0, 690, 120, 8);
        var btn1Border = this.add.graphics();
        btn1Border.lineStyle(5, 0x87d1ff, 1);
        btn1Border.strokeRoundedRect(0, 0, 690, 120, 8);
        btn1Border.setAlpha(0)
        var btn1Text = this.add.text(100, 60, "A. Taylor Swift", { fontFamily: "Arial", fontSize: "72px", fill: "#000000" });
        btn1Text.setOrigin(0.5).setScale(0.5)
        btn1Text.alpha = 1
        var btn1 = this.add.container(960 - (690 / 2), 480, [btn1Graphic, btn1Text, btn1Border]);
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
            btn2Border.setAlpha(0)
            btn3Border.setAlpha(0)
            btn1Border.setAlpha(1)
            isCorrect = true
        }, this);

        // Button 2.
        var btn2Graphic = this.add.graphics();
        btn2Graphic.fillStyle(0xffffff, 1);
        btn2Graphic.fillRoundedRect(0, 0, 690, 120, 8);
        var btn2Border = this.add.graphics();
        btn2Border.lineStyle(5, 0x87d1ff, 1);
        btn2Border.strokeRoundedRect(0, 0, 690, 120, 8);
        btn2Border.setAlpha(0)
        var btn2Text = this.add.text(100, 60, "B. Drake", { fontFamily: "Arial", fontSize: "72px", fill: "#000000" });
        btn2Text.setOrigin(0.5).setScale(0.5)
        btn2Text.alpha = 1
        var btn2 = this.add.container(960 - (690 / 2), 680, [btn2Graphic, btn2Text, btn2Border]);
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
            btn1Border.setAlpha(0)
            btn3Border.setAlpha(0)
            btn2Border.setAlpha(1)
            isCorrect = false
        }, this);

        // Button 3.
        var btn3Graphic = this.add.graphics();
        btn3Graphic.fillStyle(0xffffff, 1);
        btn3Graphic.fillRoundedRect(0, 0, 690, 120, 8);
        var btn3Border = this.add.graphics();
        btn3Border.lineStyle(5, 0x87d1ff, 1);
        btn3Border.strokeRoundedRect(0, 0, 690, 120, 8);
        btn3Border.setAlpha(0)
        var btn3Text = this.add.text(100, 60, "C. Maroon 5", { fontFamily: "Arial", fontSize: "72px", fill: "#000000" });
        btn3Text.setOrigin(0.5).setScale(0.5)
        btn3Text.alpha = 1
        var btn3 = this.add.container(960 - (690 / 2), 880, [btn3Graphic, btn3Text, btn3Border]);
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
            btn1Border.setAlpha(0)
            btn2Border.setAlpha(0)
            btn3Border.setAlpha(1)
            isCorrect = false
        }, this);





        // Submit button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const submitBtn = new WideButton(this, 0, 0, 'Submit', this.nextBtnAudio);
        submitBtn.on('pointerdown', function () {
            if (isCorrect) {
                this.scene.start("Scene4_9_correct", { music: this.music });
            }
            else {
                this.scene.start("Scene4_9_incorrect", { music: this.music });
            }
        }, this);
        submitBtn.x = 960 - 130
        submitBtn.y = 1080 - 70
        submitBtn.alpha = 1


        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene4_10");
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_8");
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}