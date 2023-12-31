import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_29 extends Phaser.Scene {
    constructor() {
        super('Scene3_29');
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
        this.load.audio('suction-cup', "assets/Audio/SFX/7_Level4/suction-cup-pull.mp3");
        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('BG3-23', 'assets/Images/3_Level1/myth-fact-bg.jpg');
        this.load.image('circle-arrow', 'assets/Images/3_Level1/myth-fact-check/circle-arrow.png');
        /** I use SVG because it has benefit for better scale pixel */
        this.load.svg('empty-bullet', "assets/Images/3_Level1/myth-fact-check/ring-empty.svg");
        this.load.svg('full-bullet', "assets/Images/3_Level1/myth-fact-check/ring-full.svg");
        // Video.
        this.load.video('fact-vid', 'assets/Videos/3_Level1/fact-vid.mp4');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module3');
            this.music.play();
            this.music.setVolume(0.1);
            this.music.loop = true;
        }

        // BG.
        var bg = this.add.sprite(0, 0, 'BG3-23').setOrigin(0.0);

        // Video.
        const vid = this.add.video(0, 0, 'fact-vid');
        vid.setOrigin(0);

        // Audio
        this.suctionCup = this.sound.add('suction-cup', { loop: false });

        /** This scene we have next and back button render before main button because
         *  based on playbook next button only showing when the answer video show up. 
         */
        // Next button.     
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene3_30", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40;
        nextBtn.setAlpha(0);

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_28", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40;

        // Main button ---
        // Graphic.
        const btnGraphic = this.add.graphics();
        btnGraphic.fillStyle(0xffffff, 1)
            .fillRoundedRect(600, 382, 720, 570, 26)
            .lineStyle(6, 0x004aad, 1)
            .strokeRoundedRect(600, 382, 720, 570, 26)
        // Text.
        this.btnText = this.add.rexBBCodeText(960, 650,
            `[b]Myth or Fact?[/b]

Vaping can lead
to smoking cigarettes?`,
            { fontFamily: "Arial", fontSize: "108px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.btnText.scale = 0.4

        btnGraphic.setInteractive(new Phaser.Geom.Rectangle(600, 382, 720, 570,), Phaser.Geom.Rectangle.Contains)
        btnGraphic.on('pointerover', function () {
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        btnGraphic.on('pointerout', function () {
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });
        var isAnswer = false;
        btnGraphic.on('pointerdown', () => {
            if (!isAnswer) {
                vid.alpha = 1;
                nextBtn.alpha = 1;
                vid.play();
                this.btnText.setText(`[b]Fact[/b]

Teens are 3-4x more
likely to smoke cigarettes
if they use vaping
products first.`)
            }
            else {
                vid.stop();
                vid.alpha = 0;
                nextBtn.alpha = 0;
                this.btnText.setText(`[b]Myth or Fact?[/b]

Vaping can lead
to smoking cigarettes?`)
            }
            this.suctionCup.play();
            isAnswer = !isAnswer
        });

        // The circle icon
        const circleArrow = this.add.sprite(1240, 883, 'circle-arrow').setScale(1.1);
        // - - End of Main Button - - //

        // Progress Bullets Point
        /** This scene have 1 full bullet and 6 empty bullet */
        /** We use an anchor point to make edit the position of those bullets easier  */
        const bulletsX = 630;
        const bulletsY = 1020;
        const bullet1 = this.add.sprite(bulletsX, bulletsY, 'full-bullet').setScale(0.33);
        const bullet2 = this.add.sprite(bulletsX + 110, bulletsY, 'full-bullet').setScale(0.33);
        const bullet3 = this.add.sprite(bulletsX + 110 * 2, bulletsY, 'empty-bullet').setScale(0.4);
        const bullet4 = this.add.sprite(bulletsX + 110 * 3, bulletsY, 'empty-bullet').setScale(0.4);
        const bullet5 = this.add.sprite(bulletsX + 110 * 4, bulletsY, 'empty-bullet').setScale(0.4);
        const bullet6 = this.add.sprite(bulletsX + 110 * 5, bulletsY, 'empty-bullet').setScale(0.4);
        const bullet7 = this.add.sprite(bulletsX + 110 * 6, bulletsY, 'empty-bullet').setScale(0.4);



        // Save user progress.
        const save = new SaveProgress(this)
    }
}