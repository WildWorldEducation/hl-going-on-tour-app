import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import BackButton from '../Custom_Classes/BackButton.js';

export default class Scene7_27 extends Phaser.Scene {
    constructor() {
        super('Scene7_27');
    }
    init(data) {
        this.music = data.music;
    }
    preload() {
        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Music.
        this.load.audio("las-vegas-song", ["assets/Audio/Music/7_Level4/las-vegas-song.mp3"]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        this.load.audio("light-on", ["assets/Audio/SFX/7_Level4/light-on-sound.mp3"]);
        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('short-off-light-bulb', 'assets/Images/7_Level4/sprite/hang-light-bulb/short-off-light-bulb.png');
        this.load.image('short-on-light-bulb', 'assets/Images/7_Level4/sprite/hang-light-bulb/short-on-light-bulb.png');
        this.load.image('long-off-light-bulb', 'assets/Images/7_Level4/sprite/hang-light-bulb/long-off-light-bulb.png');
        this.load.image('long-on-light-bulb', 'assets/Images/7_Level4/sprite/hang-light-bulb/long-on-light-bulb.png');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('las-vegas-song');
            this.music.play();
            this.music.setVolume(0.4);
            this.music.loop = true
        }

        // Background
        this.cameras.main.setBackgroundColor("#94a0e3"); // use a single color for background

        // Audio
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        this.lightOnSound = this.sound.add("light-on", { loop: false });

        // Play the light on sound when stage is initial
        this.lightOnSound.setVolume(2);
        this.lightOnSound.play();


        // Title. //
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 450, 150, 32);
        this.tileText = this.add.text(75, 75, "Shifting Mindset",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);

        // background for instruction text sprite. //
        this.instructionTextBg = this.add.sprite(180, 320, 'text-bg').setOrigin(0).setScale(2, 1.4);

        /**
         * SOME GENERIC VALUE FOR ANIMATING PURPOSE
         * --- ----
         */

        const aniDuration = 150;
        const aniDelay = 200;

        // +- Light Bulbs section -+ // 
        // - light bulb 1 - //
        const lightBulb1Off = this.add.sprite(1220, 140, 'short-off-light-bulb').setScale(0.35);
        const lightBulb1On = this.add.sprite(1220, 140, 'short-on-light-bulb').setScale(0.35).setAlpha(0);
        this.tweens.add({
            targets: lightBulb1On,
            alpha: 1,
            duration: aniDuration,
            delay: aniDelay
        })

        // - light bulb 2 - //
        const lightBulb2Off = this.add.sprite(1375, 120, 'short-off-light-bulb').setScale(0.35);
        const lightBulb2On = this.add.sprite(1375, 120, 'short-on-light-bulb').setScale(0.35).setAlpha(0);
        // - light bulb 3 - //
        const lightBulb3Off = this.add.sprite(1540, 127, 'long-off-light-bulb').setScale(0.35);
        const lightBulb3On = this.add.sprite(1540, 127, 'long-on-light-bulb').setScale(0.35).setAlpha(0);
        // - light bulb 4 - //
        const lightBulb4Off = this.add.sprite(1680, 100, 'short-off-light-bulb').setScale(0.35);
        const lightBulb4On = this.add.sprite(1680, 100, 'short-on-light-bulb').setScale(0.35).setAlpha(0);
        // - light bulb 5 - //
        const lightBulb5Off = this.add.sprite(1810, 200, 'long-off-light-bulb').setScale(0.35);
        const lightBulb5On = this.add.sprite(1810, 200, 'long-on-light-bulb').setScale(0.35).setAlpha(0);
        // +- End of light bulbs section -+ //

        // -- Instruction texts section -- //
        // instruction text 1
        this.instructionText1 = this.add.rexBBCodeText(380, 415,
            "Where was I one year ago, three years ago, and five years ago?",
            { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center', lineSpacing: 17 }).setOrigin(0, 0);
        // Dealing with text quality.
        this.instructionText1.scale = (0.5);
        this.instructionText1.setAlpha(0);
        this.tweens.add({
            targets: this.instructionText1,
            duration: aniDuration,
            delay: aniDelay,
            alpha: 1
        });

        // instruction text 2
        this.instructionText2 = this.add.rexBBCodeText(480, 515,
            "How have my skills changed and developed over time?",
            { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center', lineSpacing: 17 }).setOrigin(0, 0);
        // Dealing with text quality.
        this.instructionText2.scale = (0.5);
        this.instructionText2.setAlpha(0);
        // instruction text 3
        this.instructionText3 = this.add.rexBBCodeText(380, 615,
            "What do I know how to do now that I didn\'t know how to do then?",
            { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center', lineSpacing: 17 }).setOrigin(0, 0);
        // Dealing with text quality.
        this.instructionText3.scale = (0.5);
        this.instructionText3.setAlpha(0);
        // instruction text 4
        this.instructionText4 = this.add.rexBBCodeText(410, 715,
            "What do I have more expertise in now that I didn\'t have then?",
            { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center', lineSpacing: 17 }).setOrigin(0, 0);
        // Dealing with text quality.
        this.instructionText4.scale = (0.5);
        this.instructionText4.setAlpha(0);
        // instruction text 5
        this.instructionText5 = this.add.rexBBCodeText(430, 820,
            "Reflecting on how you\'ve changed and progressed over time \ncan help you believe that skills are cultivated.",
            { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center', lineSpacing: 17 }).setOrigin(0, 0);
        // Dealing with text quality.
        this.instructionText5.scale = (0.5);
        this.instructionText5.setAlpha(0);

        // -- End of Instruction texts section -- //

        // Next button.
        // Flag to count how many times the user have click next button
        let click = 0;
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow');
        nextBtn.on('pointerdown', function () {
            switch (click) {
                case 0:
                    this.lightOnSound.play();
                    this.tweens.chain({
                        tweens: [
                            {
                                targets: [this.instructionText2, lightBulb2On],
                                alpha: 1,
                                delay: aniDelay,
                                duration: aniDuration
                            },
                            {
                                // hide the light bulb off sprite for smaller memory consume
                                targets: lightBulb2Off,
                                alpha: 0,
                                duration: 0,
                                delay: 0
                            }
                        ]
                    });
                    break;
                case 1:
                    this.lightOnSound.play();
                    this.tweens.chain({
                        tweens: [
                            {
                                targets: [this.instructionText3, lightBulb3On],
                                alpha: 1,
                                delay: aniDelay,
                                duration: aniDuration
                            },
                            {
                                // hide the light bulb off sprite for smaller memory consume
                                targets: lightBulb3Off,
                                alpha: 0,
                                duration: 0,
                                delay: 0
                            }
                        ]
                    });
                    break;
                case 2:
                    this.lightOnSound.play();
                    this.tweens.chain({
                        tweens: [
                            {
                                targets: [this.instructionText4, lightBulb4On],
                                alpha: 1,
                                delay: aniDelay,
                                duration: aniDuration
                            },
                            {
                                // hide the light bulb off sprite for smaller memory consume
                                targets: lightBulb4Off,
                                alpha: 0,
                                duration: 0,
                                delay: 0
                            }
                        ]
                    });
                    break;
                case 3:
                    this.lightOnSound.play();
                    this.tweens.chain({
                        tweens: [
                            {
                                targets: [this.instructionText5, lightBulb5On],
                                alpha: 1,
                                delay: aniDelay,
                                duration: aniDuration
                            },
                            {
                                // hide the light bulb off sprite for smaller memory consume
                                targets: lightBulb5Off,
                                alpha: 0,
                                duration: 0,
                                delay: 0
                            }
                        ]
                    });
                    break;
                case 4:
                    this.nextBtnAudio.play();
                    this.scene.start("Scene7_28", { music: this.music });
                    break;
                default:
                    break;
            }
            click++;
        }, this);

        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene7_26", { music: this.music });
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);
    }
}