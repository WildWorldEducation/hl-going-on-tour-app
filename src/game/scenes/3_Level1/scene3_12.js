import WideButton from '../Custom_Classes/WideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

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
        this.country1 = this.sound.add("country1");

        // BG.
        this.cameras.main.setBackgroundColor("#959fe4");
        var bg = this.add.sprite(0, 0, 'notes-bg').setOrigin(0);
        bg.alpha = 0.5

        var isPlaying = false;

        // playBtn.
        var playBtn = this.add.sprite(0, 0, 'play-btn').setOrigin(0.5);

        // stopBtn.
        var stopBtn = this.add.sprite(0, 0, 'stop-btn').setOrigin(0.5).setAlpha(0);

        // musicBtn.
        var musicContainer = this.add.container(1920 - 100, 100, [playBtn, stopBtn])
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
                this.country1.stop()
                playBtn.setAlpha(1)
                stopBtn.setAlpha(0)
            }
            else {
                this.country1.play()
                stopBtn.setAlpha(1)
                playBtn.setAlpha(0)
            }

            isPlaying = !isPlaying
        }, this);

        // Stars.
        var stars = this.add.sprite(400, 100, 'stars').setOrigin(0.5);
        stars.setScale(0.6)

        // Header.
        var header = this.add.graphics();
        header.fillStyle(0xffffff, 1);
        header.fillRoundedRect(260, 320, 1380, 140, 72);
        var headerText = this.add.rexBBCodeText(960, 390,
            `[b]Press the Play button above[/b]
and select to which music genre this song belongs to.`,
            { fontFamily: "Arial", fontSize: "84px", fill: "#000000", align: "center" });
        headerText.setOrigin(0.5).setScale(0.5)
        headerText.alpha = 1

        // Buttons.
        // data of each button,
        // not sure why C.Country is is offset but this is a dirty fix
        const buttonData = [
            { text: "A. Rap", x: 260, y: 480, isCorrect: false },
            { text: "B. Pop", x: 960, y: 480, isCorrect: false },
            { text: "C. Country", x: 260, y: 620, isCorrect: true },
            { text: "D. Soul", x: 960, y: 620, isCorrect: false },
        ];

        // Button Config.
        const btnConfig = {
            radius: 8,
            width: 690,
            height: 120,
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
            const btnText = this.add.text(30, 60, data.text, {
                fontFamily: "Arial",
                fontSize: "72px",
                fill: "#000000",
                align: "left"
            });


            btnText.setOrigin(0, 0.5).setScale(0.5);
            btnGraphic.fillStyle(btnConfig.fill, 1);
            btnGraphic.fillRoundedRect(0, 0, btnConfig.width, btnConfig.height, btnConfig.radius);

            btnBorder.lineStyle(btnConfig.border.width, btnConfig.border.color);
            btnBorder.strokeRoundedRect(0, 0, btnConfig.width, btnConfig.height, btnConfig.radius);

            // not visible on start
            btnBorder.setVisible(false)
            btnBorders.push(btnBorder)

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
                isCorrect = data.isCorrect;
                this.selectedButton = btnContainer;

                btnBorders.forEach((border) => {
                    border.setVisible(false)
                })

                btnBorder.setVisible(true);

            }, this);

            buttonGroup.add(btnContainer);
        });


        // Submit button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const submitBtn = new WideButton(this, 0, 0, 'Submit', this.nextBtnAudio);
        submitBtn.on('pointerdown', function () {
            this.country1.stop()
            if (isCorrect) {
                this.scene.start("Scene3_12_correct", { music: this.music });
            }
            else {
                this.scene.start("Scene3_12_incorrect", { music: this.music });
            }
        }, this);
        submitBtn.x = 960 - 130
        submitBtn.y = 1080 - 70
        submitBtn.alpha = 1

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_11");

            // stop audio
            this.country1.stop()

        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}