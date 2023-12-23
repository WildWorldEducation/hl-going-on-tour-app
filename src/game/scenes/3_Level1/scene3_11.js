import WideButton from '../Custom_Classes/WideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_11 extends Phaser.Scene {
    constructor() {
        super('Scene3_11');
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
        this.load.audio("count-down", ["assets/Audio/SFX/3_Level1/count-down.mp3"]);
        // Sprites.
        this.load.image('notes-bg', 'assets/Images/3_Level1/notes-bg.png');
        this.load.image('text-card3-11', 'assets/Images/3_Level1/text-card1.png');
        // 5 number for count down animation
        this.load.svg('number1', 'assets/Images/3_Level1/quiz-count-down/one.svg');
        this.load.svg('number2', 'assets/Images/3_Level1/quiz-count-down/two.svg');
        this.load.svg('number3', 'assets/Images/3_Level1/quiz-count-down/three.svg');
        this.load.svg('number4', 'assets/Images/3_Level1/quiz-count-down/four.svg');
        this.load.svg('number5', 'assets/Images/3_Level1/quiz-count-down/five.svg');
    }

    create() {
        // Music.
        // Stop theme the music for count down music
        if (typeof this.music !== 'undefined') {
            this.music.stop();
        }
        // count down music 
        const countDownMusic = this.sound.add('count-down', { loop: false });
        this.time.addEvent({
            delay: 600,
            callback: () => {
                // play the failed sound after 500 ms
                countDownMusic.play();
            },
            loop: false
        });
        // Play theme music after the countdown sound
        countDownMusic.on('complete', () => {
            // Check if music is playing.
            if (typeof this.music == 'undefined') {
                this.music = this.sound.add('theme-module3');
            }
            this.music.play();
            this.music.setVolume(0.1);
            this.music.loop = true
        })


        // BG.
        this.cameras.main.setBackgroundColor("#959fe4");
        var bg = this.add.sprite(0, 0, 'notes-bg').setOrigin(0);
        bg.alpha = 0.5;

        // Instructions.
        var instructionsBG = this.add.sprite(960, 540, 'text-card3-11').setOrigin(0.5).setAlpha(0.9);
        instructionsBG.setScale(0.8, 0.7);
        this.instructionText = this.add.text(960, 540 - 80, "Check your musical knowledge!",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.5);
        this.instructionText.scale = 0.5;

        // Count Down Numbers
        const number1 = this.add.image(950, 570, 'number1').setAlpha(0).setScale(0).setOrigin(0.5);
        const number2 = this.add.image(950, 570, 'number2').setAlpha(0).setScale(0).setOrigin(0.5);
        const number3 = this.add.image(950, 570, 'number3').setAlpha(0).setScale(0).setOrigin(0.5);
        const number4 = this.add.image(950, 570, 'number4').setAlpha(0).setScale(0).setOrigin(0.5);
        const number5 = this.add.image(950, 570, 'number5').setAlpha(0).setScale(0).setOrigin(0.5);

        // Start button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const startBtn = new WideButton(this, 960 - 130, 540 - 50, 'Start', this.nextBtnAudio);
        startBtn.on('pointerdown', function () {
            this.music.pause()
            this.scene.start("Scene3_12", { music: this.music });
        }, this);
        startBtn.y = startBtn.y + 60;
        startBtn.setAlpha(0);


        // // _-_ Count Down Animation _-_ // //
        this.tweens.chain({
            tweens: [
                {
                    targets: number5,
                    alpha: 1,
                    scale: 0.15,
                    angle: 360,
                    ease: 'Sine.easeInOut',
                    delay: 300,
                    duration: 300
                },
                {
                    targets: number5,
                    alpha: 0,
                    duration: 0,
                    delay: 200,
                },
                {
                    targets: number4,
                    alpha: 1,
                    scale: 0.15,
                    angle: 360,
                    ease: 'Sine.easeInOut',
                    duration: 400
                },
                {
                    delay: 200,
                    targets: number4,
                    alpha: 0,
                    duration: 0
                },
                {
                    targets: number3,
                    alpha: 1,
                    scale: 0.15,
                    angle: 360,
                    ease: 'Sine.easeInOut',
                    duration: 340
                },
                {
                    delay: 150,
                    targets: number3,
                    alpha: 0,
                    duration: 0
                },
                {
                    targets: number2,
                    alpha: 1,
                    scale: 0.15,
                    angle: 360,
                    ease: 'Sine.easeInOut',
                    duration: 340
                },
                {
                    delay: 150,
                    targets: number2,
                    alpha: 0,
                    duration: 0
                },
                {
                    targets: number1,
                    alpha: 1,
                    scale: 0.15,
                    angle: 360,
                    ease: 'Sine.easeInOut',
                    duration: 340
                },
                {
                    delay: 150,
                    targets: number1,
                    alpha: 0,
                    duration: 0
                },
                {
                    targets: startBtn,
                    alpha: 1,
                    duration: 300,
                    delay: 100
                }

            ]
        })

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 335, 150, 32);
        this.titleText = this.add.text(55, 75, "Audio quiz",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Save user progress.
        const save = new SaveProgress(this)
    }
}