import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene4_11 extends Phaser.Scene {
    constructor() {
        super('Scene4_11');
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        //Sprites                
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('textBG4-11', 'assets/Images/General/text-card.png');
        this.load.image('textBG4-11B', 'assets/Images/General/text-card3.png');
        this.load.image('stage1', 'assets/Images/4_Level2/stage.jpg');
        this.load.image('stage2', 'assets/Images/4_Level2/stage2.jpg');
    }

    create() {
        // To deal with progression after clikcing next button.
        this.clicks = 1

        // BG.        
        var stage = this.add.sprite(0, 0, 'stage1').setOrigin(0);

        // Title.
        this.titleBg = this.add.graphics();
        this.titleBg.fillStyle(0xFFFFFF, 1);
        this.titleBg.fillRoundedRect(-30, 0, 450, 150, 32);
        this.titleText = this.add.text(55, 75,
            `Triple Threat Talents`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.titleBg, this.titleText]);

        // Text.
        this.textBG1 = this.add.sprite(960, 540, 'textBG4-11').setOrigin(0.5).setScale(1.3);
        this.textBG1.alpha = 0.9
        this.text1 = this.add.rexBBCodeText(960, 540,
            `A talent is the natural ability to do something
well. Everyone has talents, maybe it is art,
sports, drama, writing, music, cooking,
dancing or being a leader.`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text1.scale = 0.5

        this.textBG2 = this.add.sprite(960, 540, 'textBG4-11B').setOrigin(0.5).setScale(2.1);
        this.textBG2.alpha = 0
        this.text2 = this.add.rexBBCodeText(960, 420,
            `What are some of your talents? [b]Write down one of your
talents and explain how this is a talent.[/b] Examples - I am a
talented musician because I can sing and play the guitar.`,
            { fontFamily: "Arial", fontSize: "76px", color: '#000000', align: 'center' }).setOrigin(0.5).setAlpha(0);
        // Dealing with text quality.
        this.text2.scale = 0.5


        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', () => {
            if (this.clicks == 1) {
                stage.setTexture('stage2')

                this.textBG1.alpha = 0
                this.text1.alpha = 0
                this.textBG2.alpha = 1
                this.text2.alpha = 1

                // Show the text input.
                this.formUtil = new FormUtil({
                    scene: this
                });

                this.formUtil.showElement("talents");
                this.formUtil.scaleToGameW("talents", .4);
            }
            else {
                // Hide the text input.
                this.formUtil = new FormUtil({
                    scene: this
                });
                this.formUtil.hideElement("talents");
                this.scene.start("Scene4_12");
            }
            this.clicks++
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            // Hide the text input.
            this.formUtil = new FormUtil({
                scene: this
            });
            this.formUtil.hideElement("talents");

            if (this.clicks == 2) {
                stage.setTexture('stage1')

                this.textBG1.alpha = 1
                this.text1.alpha = 1
                this.textBG2.alpha = 0
                this.text2.alpha = 0

                this.clicks--;
            }
            else
                this.scene.start("Scene4_10");
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}