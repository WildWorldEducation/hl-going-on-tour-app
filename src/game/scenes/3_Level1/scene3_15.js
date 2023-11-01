import WideButton from '../Custom_Classes/WideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_15 extends Phaser.Scene {
    constructor() {
        super('Scene3_15');
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
        this.load.audio("pop1", ["assets/Audio/Music/3_Level1/genre-quiz/pop1.mp3"]);
        this.load.audio("jazz2", ["assets/Audio/Music/3_Level1/genre-quiz/jazz2.mp3"]);
        this.load.audio("rock3", ["assets/Audio/Music/3_Level1/genre-quiz/rock3.mp3"]);
        this.load.audio("pop2", ["assets/Audio/Music/3_Level1/genre-quiz/pop2.mp3"]);

        // Sprites.
        this.load.image('notes-bg', 'assets/Images/3_Level1/notes-bg.png');
        this.load.image('play-btn-square', 'assets/Images/3_Level1/genre-quiz/play-btn-square.png');
        this.load.image('stop-btn-square', 'assets/Images/3_Level1/genre-quiz/stop-btn-square.png');

        this.load.image('stars', 'assets/Images/3_Level1/stars.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
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

        var isCorrect = false

        // Music tracks
        this.pop1 = this.sound.add("pop1");
        this.jazz2 = this.sound.add("jazz2");
        this.rock3 = this.sound.add("rock3");
        this.pop2 = this.sound.add("pop2");

        // BG.
        this.cameras.main.setBackgroundColor("#959fe4");
        var bg = this.add.sprite(0, 0, 'notes-bg').setOrigin(0);
        bg.alpha = 0.5

        // Stars.
        var stars = this.add.sprite(400, 100, 'stars').setOrigin(0.5);
        stars.setScale(0.6)

        // Header.
        var header = this.add.graphics();
        header.fillStyle(0xffffff, 1);
        header.fillRoundedRect(260, 320, 1380, 140, 72);
        var headerText = this.add.text(960, 390,
            `Listen to the songs below. Which one do you think sounds more like jazz?`,
            { fontFamily: "Arial", fontSize: "84px", fill: "#000000", align: "center" });
        headerText.setOrigin(0.5).setScale(0.5)

        // Button 1.
        var btn1Graphic = this.add.graphics();
        btn1Graphic.fillStyle(0xffffff, 1);
        btn1Graphic.fillRoundedRect(0, 0, 690, 120, 8);
        var btn1Text = this.add.text(200, 60, "A. Song 1", { fontFamily: "Arial", fontSize: "72px", fill: "#000000" });
        btn1Text.setOrigin(0.5).setScale(0.5)
        // playBtn.
        var btn1PlayBtn = this.add.sprite(0, 0, 'play-btn-square').setOrigin(0);
        btn1PlayBtn.setScale(0.28)
        var btn1StopBtn = this.add.sprite(0, 0, 'stop-btn-square').setOrigin(0);
        btn1StopBtn.setScale(0.28).setAlpha(0)
        var btn1 = this.add.container(260, 480, [btn1Graphic, btn1PlayBtn, btn1StopBtn, btn1Text]);
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
            btn1StopBtn.setAlpha(1)
            btn2StopBtn.setAlpha(0)
            btn3StopBtn.setAlpha(0)
            btn4StopBtn.setAlpha(0)
            // Stop other tracks.            
            this.rock3.stop()
            this.pop2.stop()
            this.jazz2.stop()
            // Play this track.
            this.pop1.play()
        }, this);
        btn1Graphic.alpha = 1

        // Button 2.
        var btn2Graphic = this.add.graphics();
        btn2Graphic.fillStyle(0xffffff, 1);
        btn2Graphic.fillRoundedRect(0, 0, 690, 120, 8);
        var btn2Text = this.add.text(200, 60, "B. Song 2", { fontFamily: "Arial", fontSize: "72px", fill: "#000000" });
        btn2Text.setOrigin(0.5).setScale(0.5)
        // playBtn.
        var btn2PlayBtn = this.add.sprite(0, 0, 'play-btn-square').setOrigin(0);
        btn2PlayBtn.setScale(0.28)
        var btn2StopBtn = this.add.sprite(0, 0, 'stop-btn-square').setOrigin(0);
        btn2StopBtn.setScale(0.28).setAlpha(0)
        var btn2 = this.add.container(960, 480, [btn2Graphic, btn2PlayBtn, btn2StopBtn, btn2Text]);
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
            isCorrect = true
            btn1StopBtn.setAlpha(0)
            btn2StopBtn.setAlpha(1)
            btn3StopBtn.setAlpha(0)
            btn4StopBtn.setAlpha(0)
            // Stop other tracks.
            this.rock3.stop()
            this.pop1.stop()
            this.pop2.stop()
            // Play this track.
            this.jazz2.play()
        }, this);
        btn2Graphic.alpha = 1

        // Button 3.
        var btn3Graphic = this.add.graphics();
        btn3Graphic.fillStyle(0xffffff, 1);
        btn3Graphic.fillRoundedRect(0, 0, 690, 120, 8);
        var btn3Text = this.add.text(200, 60, "C. Song 3", { fontFamily: "Arial", fontSize: "72px", fill: "#000000" });
        btn3Text.setOrigin(0.5).setScale(0.5)
        // playBtn.
        var btn3PlayBtn = this.add.sprite(0, 0, 'play-btn-square').setOrigin(0);
        btn3PlayBtn.setScale(0.28)
        var btn3StopBtn = this.add.sprite(0, 0, 'stop-btn-square').setOrigin(0);
        btn3StopBtn.setScale(0.28).setAlpha(0)
        var btn3 = this.add.container(260, 620, [btn3Graphic, btn3PlayBtn, btn3StopBtn, btn3Text]);
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
            btn1StopBtn.setAlpha(0)
            btn2StopBtn.setAlpha(0)
            btn3StopBtn.setAlpha(1)
            btn4StopBtn.setAlpha(0)
            // Stop other tracks.
            this.pop1.stop()
            this.pop2.stop()
            this.jazz2.stop()
            // Play this track.
            this.rock3.play()
        }, this);
        btn3Graphic.alpha = 1

        // Button 4.
        var btn4Graphic = this.add.graphics();
        btn4Graphic.fillStyle(0xffffff, 1);
        btn4Graphic.fillRoundedRect(0, 0, 690, 120, 8);
        var btn4Text = this.add.text(200, 60, "D. Song 4", { fontFamily: "Arial", fontSize: "72px", fill: "#000000" });
        btn4Text.setOrigin(0.5).setScale(0.5)
        // playBtn.
        var btn4PlayBtn = this.add.sprite(0, 0, 'play-btn-square').setOrigin(0);
        btn4PlayBtn.setScale(0.28)
        var btn4StopBtn = this.add.sprite(0, 0, 'stop-btn-square').setOrigin(0);
        btn4StopBtn.setScale(0.28).setAlpha(0)
        var btn4 = this.add.container(960, 620, [btn4Graphic, btn4PlayBtn, btn4StopBtn, btn4Text]);
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
            isCorrect = false
            btn1StopBtn.setAlpha(0)
            btn2StopBtn.setAlpha(0)
            btn3StopBtn.setAlpha(0)
            btn4StopBtn.setAlpha(1)
            // Stop other tracks.
            this.pop1.stop()
            this.rock3.stop()
            this.jazz2.stop()
            // Play this track.
            this.pop2.play()
        }, this);
        btn4Graphic.alpha = 1

        // Submit button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const submitBtn = new WideButton(this, 0, 0, 'Submit', this.nextBtnAudio);
        submitBtn.on('pointerdown', function () {
            // Stop tracks.
            this.pop1.stop()
            this.rock3.stop()
            this.jazz2.stop()
            this.pop2.stop()
            if (isCorrect) {
                this.scene.start("Scene3_15_correct", { music: this.music });
            }
            else {
                this.scene.start("Scene3_15_incorrect", { music: this.music });
            }
        }, this);
        submitBtn.x = 960 - 130
        submitBtn.y = 1080 - 70
        submitBtn.alpha = 1

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_14");
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}