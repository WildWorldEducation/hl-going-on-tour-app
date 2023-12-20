import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import WideButton from '../Custom_Classes/WideButton.js'
import FormUtil from '../util/formUtil.js'

export default class Scene4_15 extends Phaser.Scene {
    constructor() {
        super('Scene4_15');
    }
    init(data) {
        // So that the second time incorrect it is different.
        this.timesWrong = data.timesWrong;
        this.music = data.music;
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Music.
        this.load.audio("nyc-song", ["assets/Audio/Music/4_Level2/nyc-song.mp3"]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        //Sprites                
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('textBG4-14', 'assets/Images/General/text-card3.png');
        this.load.image('bg4-14', 'assets/Images/4_Level2/securityBG.jpg');
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

        if (typeof this.timesWrong == 'undefined') {
            this.timesWrong = 0
        }
        this.timesWrong++;

        // BG.        
        var bg = this.add.sprite(0, 0, 'bg4-14').setOrigin(0);

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 1250, 150, 32);
        this.titleText = this.add.rexBBCodeText(55, 75,
            `Why would they be confiscating vape pens? [b]Click on all that apply.[/b]`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // the blur cover
        const cover = this.add.rectangle(960, 540, 1920, 1080, 0xffffff).setAlpha(0);
        const chain = this.tweens.chain({
            tweens: [
                {
                    targets: [cover],
                    alpha: 0.6,
                    delay: 1500,
                    duration: 700,
                    repeat: 0,
                },
            ],
        });

        // Text background.
        //   var textCard = this.add.sprite(960, 540, 'textBG4-14').setOrigin(0.5).setAlpha(0.9).setScale(2)

        // Checkbox input.
        this.formUtil = new FormUtil({
            scene: this
        });

        this.formUtil.showElement("m4-checkboxes");
        //  this.formUtil.scaleToGameW("m4-checkboxes", .4);

        // Submit button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const submitBtn = new WideButton(this, 960 - 130, 1080 - 60 - 60, 'Submit', this.nextBtnAudio);
        submitBtn.on('pointerdown', function () {
            this.formUtil.hideElement("m4-checkboxes");

            // Check answer.
            const box1 = document.getElementById("m4-checkbox-1").checked;
            const box2 = document.getElementById("m4-checkbox-2").checked;
            const box3 = document.getElementById("m4-checkbox-3").checked;
            const box4 = document.getElementById("m4-checkbox-4").checked;

            if (box1 && box2 && box3 && box4) {
                this.scene.start("Scene4_15_correct", { music: this.music });
            }
            else {
                this.scene.start("Scene4_15_incorrect", { timesWrong: this.timesWrong, music: this.music });
            }

        }, this);

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.formUtil.hideElement("m4-checkboxes");
            this.scene.start("Scene4_14", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}