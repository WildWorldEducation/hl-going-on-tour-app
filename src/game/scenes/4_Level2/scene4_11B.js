/** 
 * I think the stage with spotlight should be in a separate scene 
 * This way we can make the spotlight animation and the stage open animation much more easer and better
 * And in the playbook design when you click back button in scene2_12 it will return to the stage with light
*/
import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import FormUtil from '../util/formUtil.js'

export default class Scene4_11B extends Phaser.Scene {
    constructor() {
        super('Scene4_11B');
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
        //Sprites                
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('textBG4-11B', 'assets/Images/General/text-card3.png');
        this.load.image('stage1', 'assets/Images/4_Level2/stage/stage.jpg');
        this.load.image('stage2', 'assets/Images/4_Level2/stage/stage2.jpg');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('nyc-song');
            this.music.play();
            this.music.loop = true
        }

        // BG.        
        const stage = this.add.sprite(0, 0, 'stage1').setOrigin(0);
        const stageOpen = this.add.sprite(0, 0, 'stage2').setOrigin(0).setAlpha(0);
        // Title.
        this.titleBg = this.add.graphics();
        this.titleBg.fillStyle(0xFFFFFF, 1);
        this.titleBg.fillRoundedRect(-30, 0, 465, 150, 32);
        this.titleText = this.add.text(55, 75,
            `Triple Threat Talents`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.titleBg, this.titleText]);

        // Text.

        this.textBG2 = this.add.sprite(960, 540, 'textBG4-11B').setOrigin(0.5).setScale(2.1, 2.3);
        this.textBG2.setAlpha(0.88);
        this.text2 = this.add.rexBBCodeText(960, 420,
            `What are some of your talents? [b]Write down one of your
talents and explain how this is a talent.[/b] Examples - I am a
talented musician because I can sing and play the guitar.`,
            { fontFamily: "Arial", fontSize: "76px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text2.scale = 0.5

        // Show the text input.
        this.formUtil = new FormUtil({
            scene: this
        });

        this.formUtil.showElement("talents");
        this.formUtil.scaleToGameW("talents", .4);

        // Background Animation
        const chain = this.tweens.chain({
            tweens: [
                {
                    targets: [stageOpen],
                    alpha: 1,
                    duration: 1000,
                    ease: 'power-4',
                    repeat: 0,
                },
                {
                    targets: [stage],
                    alpha: 0,
                    duration: 500,
                    repeat: 0,
                },
            ],
        });

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', () => {
            this.formUtil.hideElement("talents");
            this.scene.start("Scene4_12", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40;

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.formUtil.hideElement("talents");
            this.scene.start("Scene4_11");
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}