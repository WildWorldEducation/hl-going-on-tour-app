import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import FormUtil from '../util/formUtil.js'
import CustomButton from '../Custom_Classes/CustomButton.js';

export default class Scene4_16 extends Phaser.Scene {
    constructor() {
        super('Scene4_16');
    }
    init(data) {
        this.music = data.music;
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Music.
        this.load.audio("nyc-song", ["assets/Audio/Music/4_Level2/nyc-song.mp3"]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        this.load.audio("failed-bell", ["assets/Audio/SFX/4_Level2/failed-bell.mp3"]);
        //Sprites                
        this.load.image('disappointed-person', 'assets/Images/4_Level2/notebook/disappointed-person.png');
        this.load.image('text-bubble', 'assets/Images/4_Level2/notebook/text-bubble.png');
        this.load.image('light-bulb', 'assets/Images/4_Level2/notebook/light-bulb.png');
        this.load.image('glow-effect', 'assets/Images/4_Level2/notebook/glow-effect.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('bg4-16', 'assets/Images/4_Level2/notepad.jpg');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('nyc-song');
            this.music.play();
            this.music.setVolume(0.5);
            this.music.loop = true
        }

        // BG.        
        var bg = this.add.sprite(0, 0, 'bg4-16').setOrigin(0);

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 1050, 150, 32);
        this.titleText = this.add.rexBBCodeText(55, 75,
            `[b]So what do you know about vaping and vape pens?[/b]`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Text input.
        this.formUtil = new FormUtil({
            scene: this
        });

        this.formUtil.showElement("m4-notepad");
        this.formUtil.scaleToGameW("m4-notepad", .4);

        // Event listener for the "enter key."
        document.querySelector('#m4-notepad').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                let answer = document.getElementById('m4-notepad').value;
                if (answer.length === 0) {
                    this.formUtil.hideElement('m4-notepad');
                    this.noAnswerCtnr.setAlpha(1);
                    this.textInBubble.setAlpha(1)
                    nextBtn.disableInteractive();
                    backBtn.disableInteractive();
                    tryAgainBtn.setAlpha(1);
                    this.time.addEvent({
                        delay: 500,
                        callback: () => {
                            // play the failed sound after 500 ms
                            this.failedBell.play();
                        },
                        loop: false
                    })
                }
                else {
                    this.formUtil.hideElement('m4-notepad');
                    this.scene.start("Scene4_17", { music: this.music });
                }
            }
        });

        // Scene for when text input is left blank. -------------------------- 
        // Add a dark layer to background.
        const subBg = this.add.graphics();
        subBg.fillStyle(0x000030, 0.55)
            .fillRect(0, 0, 1920, 1080);

        this.clickSound = this.sound.add("next-button", { loop: false });
        const tryAgainBtn = new CustomButton(this, 1342, 970, 280, 65, 'Try again', 75, -0.35, -0.20, this.clickSound);
        tryAgainBtn.setAlpha(0);
        const disappointedPerson = this.add.image(300, 280, 'disappointed-person').setOrigin(0);
        const textBubble = this.add.image(1050, 330, 'text-bubble').setScale(0.7);
        this.textInBubble = this.add.rexBBCodeText(230, 135,
            "Please fill in your answer \nbefore continuing.", { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center' }).setOrigin(0.5, 1).setScale(0.5);
        this.textInBubble.copyPosition(textBubble);
        this.textInBubble.setAlpha(0)
        const lightBulb = this.add.image(1050, 300, 'light-bulb').setScale(0.15).setOrigin(-1.48, 2.55);
        lightBulb.setAngle(15);
        lightBulb.copyPosition(textBubble);
        const glowEffect = this.add.image(0, 0, 'glow-effect').setScale(1).setOrigin(0.05, 1.1);
        glowEffect.copyPosition(lightBulb);
        this.noAnswerCtnr = this.add.container(0, 0, [subBg, glowEffect, disappointedPerson, textBubble, this.textInBubble, lightBulb, tryAgainBtn]);
        this.noAnswerCtnr.setAlpha(0);
        tryAgainBtn.on('pointerdown', () => {
            this.noAnswerCtnr.setAlpha(0);
            this.formUtil.showElement('m4-notepad');
            nextBtn.setInteractive();
            backBtn.setInteractive();
        })

        // Failed sound
        this.failedBell = this.sound.add("failed-bell", { loop: false });
        this.failedBell.setVolume(0.4);
        // End  -------------------- //

        nextBtn.on('pointerdown', () => {
            let answer = document.getElementById('m4-notepad').value;
            if (answer.length === 0) {
                this.formUtil.hideElement('m4-notepad');
                this.noAnswerCtnr.setAlpha(1);
                this.textInBubble.setAlpha(1)
                nextBtn.disableInteractive();
                backBtn.disableInteractive();
                tryAgainBtn.setAlpha(1);
                this.time.addEvent({
                    delay: 500,
                    callback: () => {
                        // play the failed sound after 500 ms
                        this.failedBell.play();
                    },
                    loop: false
                })
            }
            else {
                this.formUtil.hideElement('m4-notepad');
                this.scene.start("Scene4_17", { music: this.music });
            }
        }, this);
        nextBtn.y = nextBtn.y - 40

        backBtn.on('pointerdown', function () {
            this.formUtil.hideElement("m4-notepad");
            this.scene.start("Scene4_15", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}