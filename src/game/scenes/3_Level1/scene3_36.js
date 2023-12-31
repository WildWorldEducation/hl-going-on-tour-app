import WideButton from '../Custom_Classes/WideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import CustomButton from '../Custom_Classes/CustomButton.js';

export default class Scene3_36 extends Phaser.Scene {
    constructor() {
        super('Scene3_36');
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

        /** Because this scene these answer have position different than the music quiz scene
         * So I have the change amount flag for ease of changing multiple element
         */
        const changeAmount = -85;

        // Header.
        var header = this.add.graphics();
        header.fillStyle(0xffffff, 1);
        header.fillRoundedRect(200, 344 + changeAmount, 1520, 160, 80);
        var headerText = this.add.rexBBCodeText(960, 425 + changeAmount,
            `Federal law states that you have to be at least ____ years old \nto purchase tobacco and vaping products ?`,
            { fontFamily: "Arial", fontSize: "84px", fill: "#000000", align: "center" });
        headerText.setOrigin(0.5).setScale(0.5);

        // // _-_ Buttons Section _-_ // // 
        /** Different from scene3_12 we use a flag here to determine what border to show, 
            this way we dont have to loop through array every time we click 
        */
        let borderVisible = null;
        // == Button 1. == //
        var btn1Graphic = this.add.graphics();
        btn1Graphic.fillStyle(0xffffff, 1);
        btn1Graphic.fillRoundedRect(0, 0, 750, 145, 8);
        var btn1Text = this.add.text(30, 50, "A. 18", { fontFamily: "Arial", fontSize: "72px", fill: "#000000" });
        btn1Text.setOrigin(0).setScale(0.5);
        // btn border
        const btnBorder1 = this.add.graphics();
        btnBorder1.lineStyle(5, 0x87d1ff, 1);
        btnBorder1.strokeRoundedRect(0, 0, 750, 145, 8).setAlpha(0);
        borderVisible = btnBorder1;

        var btn1 = this.add.container(200, 523 + changeAmount, [btn1Graphic, btnBorder1, btn1Text]);
        btn1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 750, 145), Phaser.Geom.Rectangle.Contains);
        btn1.on('pointerover', function () {
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        btn1.on('pointerout', function () {
            isCorrect = false;
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });
        btn1.on('pointerdown', function () {
            borderVisible.setAlpha(0);
            borderVisible = btnBorder1;
            borderVisible.setAlpha(1);
        }, this);
        btn1Graphic.alpha = 1
        // -- //

        // == Button 2. == //
        var btn2Graphic = this.add.graphics();
        btn2Graphic.fillStyle(0xffffff, 1);
        btn2Graphic.fillRoundedRect(0, 0, 750, 145, 8);
        var btn2Text = this.add.text(30, 50, "B. 19", { fontFamily: "Arial", fontSize: "72px", fill: "#000000" });
        btn2Text.setOrigin(0).setScale(0.5);
        // btn border
        const btnBorder2 = this.add.graphics();
        btnBorder2.lineStyle(5, 0x87d1ff, 1);
        btnBorder2.strokeRoundedRect(0, 0, 750, 145, 8).setAlpha(0);
        var btn2 = this.add.container(968, 523 + changeAmount, [btn2Graphic, btnBorder2, btn2Text]);
        btn2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 750, 145), Phaser.Geom.Rectangle.Contains);

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
            isCorrect = false;
            borderVisible.setAlpha(0);
            borderVisible = btnBorder2;
            borderVisible.setAlpha(1);
        }, this);
        btn2Graphic.alpha = 1;
        // -- // 

        // == Button 3. == //
        var btn3Graphic = this.add.graphics();
        btn3Graphic.fillStyle(0xffffff, 1);
        btn3Graphic.fillRoundedRect(0, 0, 750, 145, 8);
        var btn3Text = this.add.text(30, 50, "C. 20", { fontFamily: "Arial", fontSize: "72px", fill: "#000000" });
        btn3Text.setOrigin(0).setScale(0.5);
        // btn border
        const btnBorder3 = this.add.graphics();
        btnBorder3.lineStyle(5, 0x87d1ff, 1);
        btnBorder3.strokeRoundedRect(0, 0, 750, 145, 8).setAlpha(0);
        var btn3 = this.add.container(200, 685 + changeAmount, [btn3Graphic, btnBorder3, btn3Text]);
        btn3.setInteractive(new Phaser.Geom.Rectangle(0, 0, 750, 145), Phaser.Geom.Rectangle.Contains);
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
            isCorrect = false;
            borderVisible.setAlpha(0);
            borderVisible = btnBorder3;
            borderVisible.setAlpha(1);
        }, this);
        btn3Graphic.alpha = 1

        // Button 4.
        var btn4Graphic = this.add.graphics();
        btn4Graphic.fillStyle(0xffffff, 1);
        btn4Graphic.fillRoundedRect(0, 0, 750, 145, 8);
        var btn4Text = this.add.text(30, 50, "D. 21", { fontFamily: "Arial", fontSize: "72px", fill: "#000000" });
        btn4Text.setOrigin(0).setScale(0.5);
        // btn border
        const btnBorder4 = this.add.graphics();
        btnBorder4.lineStyle(5, 0x87d1ff, 1);
        btnBorder4.strokeRoundedRect(0, 0, 750, 145, 8).setAlpha(0);
        var btn4 = this.add.container(968, 685 + changeAmount, [btn4Graphic, btnBorder4, btn4Text]);
        btn4.setInteractive(new Phaser.Geom.Rectangle(0, 0, 750, 145), Phaser.Geom.Rectangle.Contains);
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
            isCorrect = true;
            borderVisible.setAlpha(0);
            borderVisible = btnBorder4;
            borderVisible.setAlpha(1);
        }, this);
        btn4Graphic.alpha = 1;
        // // _-_ End of Buttons Section _-_ // // 

        // Submit button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const submitBtn = new CustomButton(this, 800, 940 + changeAmount, 320, 75, 'Submit', 81, -0.67, -0.29, this.nextBtnAudio, 10);
        submitBtn.on('pointerdown', function () {
            if (isCorrect) {
                this.scene.start("Scene3_36_correct", { music: this.music });
            }
            else {
                this.scene.start("Scene3_36_incorrect", { music: this.music });
            }
        }, this);
        submitBtn.alpha = 1

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_35", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}