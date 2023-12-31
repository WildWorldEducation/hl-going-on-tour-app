import WideButton from '../Custom_Classes/WideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import CustomButton from '../Custom_Classes/CustomButton.js';

export default class Scene3_12 extends Phaser.Scene {
    constructor() {
        super('Scene3_12');
    }

    init(data) {
        this.music = data.music;
        this.selectedButton = null;
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
        this.load.audio("country1", ["assets/Audio/Music/3_Level1/genre-quiz/country1.mp3"]);

        // Sprites.
        this.load.image('notes-bg', 'assets/Images/3_Level1/notes-bg.png');
        this.load.image('play-btn', 'assets/Images/3_Level1/genre-quiz/play-btn-round.png');
        this.load.image('stop-btn', 'assets/Images/3_Level1/genre-quiz/stop-btn-round.png');
        this.load.image('stars', 'assets/Images/3_Level1/stars.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');

        // Sprite Sheet
        this.load.spritesheet('sound-wave', 'assets/Images/3_Level1/genre-quiz/sound-wave-sprite-sheet.png', { frameWidth: 480, frameHeight: 480 });
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module3');
            this.music.setVolume(0.1);
            this.music.loop = true;
        }
        else {
            this.music.pause();
        }

        var isCorrect = false

        // Music tracks
        this.country1 = this.sound.add("country1");

        // BG.
        this.cameras.main.setBackgroundColor("#959fe4");
        var bg = this.add.sprite(0, 0, 'notes-bg').setOrigin(0);
        bg.alpha = 0.5

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
        soundWave1.setAngle(-35).setAlpha(0);

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
                this.country1.stop();
                soundWave1.setAlpha(0);
                soundWave2.setAlpha(0);
                soundWave1.anims.stop();
                soundWave2.anims.stop();
                playBtn.setAlpha(1)
                stopBtn.setAlpha(0)
            }
            else {
                this.country1.play()
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
            // We have a time event here to make sure all the sound wave animation will stop when music is not playing
            this.time.addEvent({
                delay: 700,
                callback: () => {
                    if (!isPlaying) {
                        soundWave1.anims.stop();
                        soundWave2.anims.stop();
                        soundWave1.setAlpha(0);
                        soundWave2.setAlpha(0);
                    }
                }
            })

        }, this);

        // Stars.
        var stars = this.add.sprite(480, 120, 'stars').setOrigin(0.5);
        stars.setScale(0.66);

        // Header.
        var header = this.add.graphics();
        header.fillStyle(0xffffff, 1);
        header.fillRoundedRect(200, 344, 1520, 160, 80);
        var headerText = this.add.rexBBCodeText(960, 425,
            `[b]Press the Play button above[/b]
and select to which music genre this song belongs to.`,
            { fontFamily: "Arial", fontSize: "84px", fill: "#000000", align: "center" });
        headerText.setOrigin(0.5).setScale(0.5);
        headerText.alpha = 1;

        // Buttons.
        // data of each button,
        // not sure why C.Country is is offset but this is a dirty fix
        const buttonData = [
            { text: "A. Rap", x: 200, y: 523, isCorrect: false },
            { text: "B. Pop", x: 968, y: 523, isCorrect: false },
            { text: "C. Country", x: 200, y: 685, isCorrect: true },
            { text: "D. Soul", x: 968, y: 685, isCorrect: false },
        ];

        // Button Config.
        const btnConfig = {
            radius: 8,
            width: 750,
            height: 145,
            fill: 0xffffff,
            border: {
                color: 0x87d1ff,
                width: 5
            }
        }

        const buttonGroup = this.add.group();
        // container for the borders, see on pointerdown
        let btnBorders = []
        // setting up each button
        buttonData.forEach((data) => {
            const btnGraphic = this.add.graphics();
            const btnBorder = this.add.graphics();
            const btnText = this.add.text(30, 50, data.text, {
                fontFamily: "Arial",
                fontSize: "72px",
                fill: "#000000"
            });

            btnText.setOrigin(0).setScale(0.5);
            btnGraphic.fillStyle(btnConfig.fill, 1);
            btnGraphic.fillRoundedRect(0, 0, btnConfig.width, btnConfig.height, btnConfig.radius);

            btnBorder.lineStyle(btnConfig.border.width, btnConfig.border.color);
            btnBorder.strokeRoundedRect(0, 0, btnConfig.width, btnConfig.height, btnConfig.radius);

            // not visible on start
            btnBorder.setVisible(false);
            btnBorders.push(btnBorder);

            // setup container
            const btnContainer = this.add.container(data.x, data.y, [btnGraphic, btnText, btnBorder]);

            btnContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, btnConfig.width, btnConfig.height), Phaser.Geom.Rectangle.Contains);

            btnContainer.on('pointerover', () => {
                this.canvas = document.getElementsByTagName("canvas")[0];
                this.canvas.style.cursor = "pointer";
            });

            btnContainer.on('pointerout', () => {
                this.canvas = document.getElementsByTagName("canvas")[0];
                this.canvas.style.cursor = "default";
            });

            btnContainer.on('pointerdown', () => {
                // If the data is correct the isCorrect flag will turn to true
                isCorrect = data.isCorrect;
                this.selectedButton = btnContainer;

                btnBorders.forEach((border) => {
                    border.setVisible(false);
                })

                btnBorder.setVisible(true);

            }, this);

            buttonGroup.add(btnContainer);
        });


        // Submit button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const submitBtn = new CustomButton(this, 800, 940, 320, 75, 'Submit', 81, -0.67, -0.29, this.nextBtnAudio, 10);
        submitBtn.on('pointerdown', function () {
            this.country1.stop()
            if (isCorrect) {
                this.scene.start("Scene3_12_correct", { music: this.music });
            }
            else {
                this.scene.start("Scene3_12_incorrect", { music: this.music });
            }
        }, this);

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_10", { music: this.music });
            // stop audio
            this.country1.stop();
        }, this);
        backBtn.y = backBtn.y - 40;

        // Save user progress.
        const save = new SaveProgress(this);
    }
}