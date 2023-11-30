import WideButton from '../Custom_Classes/WideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_13 extends Phaser.Scene {
    constructor() {
        super('Scene3_13');
    }

    init(data) {
        this.music = data.music;
        this.selectedButton = null;
    }

    preload() {
        // Module music.
        this.load.audio('theme-module3', [
            'assets/Audio/Music/3_Level1/theme-module3.mp3',
        ]);
        // Audio. 
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        this.load.audio("jazz1", ["assets/Audio/Music/3_Level1/genre-quiz/jazz1.mp3"]);
        this.load.audio("rap", ["assets/Audio/Music/3_Level1/genre-quiz/rap.mp3"]);
        this.load.audio("rock1", ["assets/Audio/Music/3_Level1/genre-quiz/rock1.mp3"]);
        this.load.audio("country2", ["assets/Audio/Music/3_Level1/genre-quiz/country2.mp3"]);

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
            `Listen to the songs below. Which one do you think sounds more like rap?`,
            { fontFamily: "Arial", fontSize: "84px", fill: "#000000", align: "center" });
        headerText.setOrigin(0.5).setScale(0.5)

        // Buttons.
        const buttonData = [
            { text: "A. Song 1", x: 260, y: 480, isCorrect: false, trackID: "jazz1" },
            { text: "B. Song 2", x: 960, y: 480, isCorrect: true, trackID: "rap" },
            { text: "C. Song 3", x: 260, y: 620, isCorrect: false, trackID: "rock1" },
            { text: "D. Song 4", x: 960, y: 620, isCorrect: false, trackID: "country1" },
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
        let btnBorders = []
        let stopButtons = []
        let sounds = []
        // setting up each button
        buttonData.forEach((data) => {
            const sound = this.sound.add(data.trackID)
            sounds.push(sound)

            const playControl = this.add.sprite(0, 0, 'play-btn-square').setOrigin(0);
            const stopControl = this.add.sprite(0, 0, 'stop-btn-square').setOrigin(0);

            const btnGraphic = this.add.graphics();
            const btnBorder = this.add.graphics();
            const btnText = this.add.text(200, 60, data.text, {
                fontFamily: "Arial",
                fontSize: "72px",
                fill: "#000000"
            });

            playControl.setScale(0.28)
            stopControl.setScale(0.28).setAlpha(0)
            stopButtons.push(stopControl)

            btnText.setOrigin(0.5).setScale(0.5);
            btnGraphic.fillStyle(btnConfig.fill, 1);
            btnGraphic.fillRoundedRect(0, 0, btnConfig.width, btnConfig.height, btnConfig.radius);

            btnBorder.lineStyle(btnConfig.border.width, btnConfig.border.color);
            btnBorder.strokeRoundedRect(0, 0, btnConfig.width, btnConfig.height, btnConfig.radius);

            // not visible on start
            btnBorder.setVisible(false)
            btnBorders.push(btnBorder)

            // setup container
            const btnContainer = this.add.container(data.x, data.y, [
                btnGraphic, btnText, btnBorder,
                playControl, stopControl
            ]);

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

                btnBorder.setVisible(true)

                stopButtons.forEach((e) => {
                    e.setAlpha(0)
                })

                stopControl.setAlpha(1)

                sounds.forEach((e) => {
                    e.stop()
                })
                sound.play()

            }, this);

            buttonGroup.add(btnContainer);
        });

        // Submit button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const submitBtn = new WideButton(this, 0, 0, 'Submit', this.nextBtnAudio);
        submitBtn.on('pointerdown', function () {
            // Stop tracks.
            sounds.forEach((e) => {
                e.stop()
            })

            if (isCorrect) {
                this.scene.start("Scene3_13_correct", { music: this.music });
            }
            else {
                this.scene.start("Scene3_13_incorrect", { music: this.music });
            }
        }, this);
        submitBtn.x = 960 - 130
        submitBtn.y = 1080 - 150
        submitBtn.alpha = 1

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_12");

            // stop sounds when navigating back
            sounds.forEach((e) => {
                e.stop()
            })

        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}