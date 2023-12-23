import WideButton from '../Custom_Classes/WideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import CustomButton from '../Custom_Classes/CustomButton.js';

export default class Scene3_14 extends Phaser.Scene {
    constructor() {
        super('Scene3_14');
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
        this.load.audio("rock2", ["assets/Audio/Music/3_Level1/genre-quiz/rock2.mp3"]);

        // Sprites.
        this.load.image('notes-bg', 'assets/Images/3_Level1/notes-bg.png');
        this.load.image('play-btn', 'assets/Images/3_Level1/genre-quiz/play-btn-round.png');
        this.load.image('stop-btn', 'assets/Images/3_Level1/genre-quiz/stop-btn-round.png');
        this.load.image('stars', 'assets/Images/3_Level1/stars.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('star', 'assets/Images/3_Level1/genre-quiz/star.png');


        // Sprite Sheet
        this.load.spritesheet('sound-wave', 'assets/Images/3_Level1/genre-quiz/sound-wave-sprite-sheet.png', { frameWidth: 480, frameHeight: 480 });
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

        // BG.
        this.cameras.main.setBackgroundColor("#959fe4");
        var bg = this.add.sprite(0, 0, 'notes-bg').setOrigin(0);
        bg.alpha = 0.5

        // flag to determine submit button function
        var isCorrect = false

        // Music tracks
        this.rock2 = this.sound.add("rock2");

        // Flag to determine sound button function 
        var isPlaying = false;

        // // Sound wave animation // //.
        this.anims.create({
            key: "playing",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("sound-wave", { start: 0, end: 39 }),
            repeat: -1,
            hideOnComplete: false
        });


        const soundWave1 = this.add.sprite(290, -210, 'sound-wave').setScale(0.55);
        soundWave1.setAngle(-35).setAlpha(0)

        const soundWave2 = this.add.sprite(-230, 280, 'sound-wave').setScale(0.55);
        soundWave2.setAngle(125).setAlpha(0);

        // playBtn.
        var playBtn = this.add.sprite(0, 0, 'play-btn').setOrigin(0.5).setScale(0.9);

        // stopBtn.
        var stopBtn = this.add.sprite(0, 0, 'stop-btn').setOrigin(0.5).setAlpha(0).setScale(0.9);

        // musicBtn.
        var musicContainer = this.add.container(1920 - 135, 115, [soundWave1, soundWave2, playBtn, stopBtn,])
        musicContainer.setScale(0.3)
        musicContainer.setInteractive(new Phaser.Geom.Rectangle(-250, -250, 500, 500), Phaser.Geom.Rectangle.Contains);

        musicContainer.on('pointerover', () => {
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });

        musicContainer.on('pointerout', () => {
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });

        musicContainer.on('pointerdown', () => {
            if (isPlaying) {
                this.rock2.stop();
                soundWave1.setAlpha(0);
                soundWave2.setAlpha(0);
                soundWave1.anims.stop();
                soundWave2.anims.stop();
                playBtn.setAlpha(1)
                stopBtn.setAlpha(0)
            }
            else {
                this.rock2.play()
                soundWave1.setAlpha(1);
                soundWave1.play('playing');
                this.time.addEvent({
                    delay: 700,
                    callback: () => {
                        soundWave2.setAlpha(1);
                        soundWave2.play('playing');
                    }
                })
                soundWave2.play('playing');
                stopBtn.setAlpha(1)
                playBtn.setAlpha(0)
            }

            isPlaying = !isPlaying
        }, this);

        // // ** Stars Sprites ** // //.
        // grey out stars
        var stars = this.add.sprite(480, 120, 'stars').setOrigin(0.5);
        stars.setScale(0.66);
        // yellow star to indicate question order and number of right answers
        const star = this.add.sprite(285, 116, 'star').setOrigin(0.5).setScale(0.17);
        const star2 = this.add.sprite(383, 116, 'star').setOrigin(0.5).setScale(0.17);
        //-- End of stars sprites -- //

        // == Header. == //
        var header = this.add.graphics();
        header.fillStyle(0xffffff, 1);
        header.fillRoundedRect(200, 344, 1520, 160, 80);
        var headerText = this.add.rexBBCodeText(960, 425,
            `[b]Press the Play button above[/b]
and select to which music genre this song belongs to.`,
            { fontFamily: "Arial", fontSize: "84px", fill: "#000000", align: "center" });
        headerText.setOrigin(0.5).setScale(0.5);
        headerText.alpha = 1;

        // // _-_ Buttons Section _-_ // // 
        /** Different from scene3_12 we use a flag here to determine what border to show, 
            this way we dont have to loop through array every time we click 
        */
        let borderVisible = null;
        // == Button 1. == //
        var btn1Graphic = this.add.graphics();
        btn1Graphic.fillStyle(0xffffff, 1);
        btn1Graphic.fillRoundedRect(0, 0, 750, 145, 8);
        var btn1Text = this.add.text(30, 50, "A. Rock", { fontFamily: "Arial", fontSize: "72px", fill: "#000000" });
        btn1Text.setOrigin(0).setScale(0.5);
        // btn border
        const btnBorder1 = this.add.graphics();
        btnBorder1.lineStyle(5, 0x87d1ff, 1);
        btnBorder1.strokeRoundedRect(0, 0, 750, 145, 8).setAlpha(0);
        borderVisible = btnBorder1;

        var btn1 = this.add.container(200, 523, [btn1Graphic, btnBorder1, btn1Text]);
        btn1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 750, 145), Phaser.Geom.Rectangle.Contains);
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
            isCorrect = true;
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
        var btn2Text = this.add.text(30, 50, "B. Jazz", { fontFamily: "Arial", fontSize: "72px", fill: "#000000" });
        btn2Text.setOrigin(0).setScale(0.5);
        // btn border
        const btnBorder2 = this.add.graphics();
        btnBorder2.lineStyle(5, 0x87d1ff, 1);
        btnBorder2.strokeRoundedRect(0, 0, 750, 145, 8).setAlpha(0);
        var btn2 = this.add.container(968, 523, [btn2Graphic, btnBorder2, btn2Text]);
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
        var btn3Text = this.add.text(30, 50, "C. Country", { fontFamily: "Arial", fontSize: "72px", fill: "#000000" });
        btn3Text.setOrigin(0).setScale(0.5);
        // btn border
        const btnBorder3 = this.add.graphics();
        btnBorder3.lineStyle(5, 0x87d1ff, 1);
        btnBorder3.strokeRoundedRect(0, 0, 750, 145, 8).setAlpha(0);
        var btn3 = this.add.container(200, 685, [btn3Graphic, btnBorder3, btn3Text]);
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
        var btn4Text = this.add.text(30, 50, "D. Rap", { fontFamily: "Arial", fontSize: "72px", fill: "#000000" });
        btn4Text.setOrigin(0).setScale(0.5);
        // btn border
        const btnBorder4 = this.add.graphics();
        btnBorder4.lineStyle(5, 0x87d1ff, 1);
        btnBorder4.strokeRoundedRect(0, 0, 750, 145, 8).setAlpha(0);
        var btn4 = this.add.container(968, 685, [btn4Graphic, btnBorder4, btn4Text]);
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
            isCorrect = false;
            borderVisible.setAlpha(0);
            borderVisible = btnBorder4;
            borderVisible.setAlpha(1);
        }, this);
        btn4Graphic.alpha = 1;
        // // _-_ End of Buttons Section _-_ // // 

        // Submit button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const submitBtn = new CustomButton(this, 800, 940, 320, 75, 'Submit', 81, -0.67, -0.29, this.nextBtnAudio, 10);
        submitBtn.on('pointerdown', function () {
            this.rock2.stop()
            if (isCorrect) {
                this.scene.start("Scene3_14_correct", { music: this.music });
            }
            else {
                this.scene.start("Scene3_14_incorrect", { music: this.music });
            }
        }, this);


        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_13");
        }, this);
        backBtn.y = backBtn.y - 40;

        // Save user progress.
        const save = new SaveProgress(this)
    }
}