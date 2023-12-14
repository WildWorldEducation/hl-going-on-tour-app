import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
//import FormUtil from '../util/formUtil.js'

export default class Scene4_11A extends Phaser.Scene {
    constructor() {
        super('Scene4_11A');
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
        this.load.image('textBG4-11', 'assets/Images/General/text-card.png');
        this.load.image('textBG4-11B', 'assets/Images/General/text-card3.png');
        this.load.image('stage1', 'assets/Images/4_Level2/stage/stage.jpg');
        this.load.image('spotlight1', 'assets/Images/4_Level2/stage/spotlight1.png');
        this.load.image('spotlight2', 'assets/Images/4_Level2/stage/spotlight2.png');
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
        var stage = this.add.sprite(0, 0, 'stage1').setOrigin(0);

        // Title.
        this.titleBg = this.add.graphics();
        this.titleBg.fillStyle(0xFFFFFF, 1);
        this.titleBg.fillRoundedRect(-30, 0, 465, 150, 32);
        this.titleText = this.add.text(55, 75,
            `Triple Threat Talents`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.titleBg, this.titleText])



        // // -+ Spotlight Sprites +- // //
        const spotlight1 = this.add.sprite(1480, 580, 'spotlight1').setScale(0.48).setAlpha(0);
        const spotlight2 = this.add.sprite(597, 417, 'spotlight2').setScale(0.44);




        // - spotlight animation - //
        /**
         * So the idea here is we will have a chains for each spotlight
         * In the chain we will move them based on the storybook
         */
        const spotlight1chain = this.tweens.chain({
            tweens: [{
                targets: [spotlight1],
                alpha: 1,
                delay: 500,
                duration: 50,
                ease: 'power-3',
                repeat: 0,
            },
            {
                targets: [spotlight1],
                x: 1080,
                y: 886,
                duration: 400,
                ease: 'power-3',
                repeat: 0,
            },
            {
                targets: [spotlight1],
                x: 385,
                y: 393,
                duration: 400,
                ease: 'power-3',
                repeat: 0,
            },
            {
                targets: [spotlight1],
                x: 271,
                y: 670,
                duration: 200,
                ease: 'power-3',
                repeat: 0,
            },
            {
                targets: [spotlight1],
                x: 438,
                y: 793,
                duration: 200,
                ease: 'power-3',
                repeat: 0,
            },
            {
                targets: [spotlight1],
                x: 512,
                y: 679,
                duration: 200,
                ease: 'power-3',
                repeat: 0,
            },
            {
                targets: [spotlight1],
                x: 1160,
                y: 156,
                duration: 350,
                ease: 'power-3',
                repeat: 0,
            },
            {
                targets: [spotlight1],
                x: 1438,
                y: 397,
                duration: 250,
                ease: 'power-3',
                repeat: 0,
            },

            {
                targets: [spotlight1],
                x: 1538,
                y: 612,
                duration: 250,
                ease: 'power-3',
                repeat: 0,
            },
            {
                targets: [spotlight1],
                x: 1352,
                y: 820,
                duration: 250,
                ease: 'power-3',
                repeat: 0,
            },
            {
                targets: [spotlight1],
                x: 940,
                y: 512,
                duration: 250,
                ease: 'power-3',
                repeat: 0,
            },
            {
                targets: [spotlight1],
                x: 668,
                y: 293,
                duration: 250,
                ease: 'power-3',
                repeat: 0,
            },
            {
                targets: [spotlight1],
                x: 399,
                y: 556,
                duration: 200,
                ease: 'power-3',
                repeat: 0,
            },
            ],
        });
        // - - - //
        const spotlight2chain = this.tweens.chain({
            tweens: [
                {
                    targets: [spotlight2],
                    x: 640,
                    y: 388,
                    duration: 150,
                    ease: 'power-3',
                    repeat: 0,
                },
                {
                    targets: [spotlight2],
                    x: 781,
                    y: 317,
                    duration: 150,
                    ease: 'power-3',
                    repeat: 0,
                },
                {
                    targets: [spotlight2],
                    x: 912,
                    y: 265,
                    duration: 150,
                    ease: 'power-3',
                    repeat: 0,
                },
                {
                    targets: [spotlight2],
                    x: 1212,
                    y: 317,
                    duration: 200,
                    ease: 'power-3',
                    repeat: 0,
                },
                {
                    targets: [spotlight2],
                    x: 1584,
                    y: 426,
                    duration: 350,
                    ease: 'power-3',
                    repeat: 0,
                },
                {
                    targets: [spotlight2],
                    x: 1415,
                    y: 743,
                    duration: 300,
                    ease: 'power-3',
                    repeat: 0,
                },
                {
                    targets: [spotlight2],
                    x: 1236,
                    y: 853,
                    duration: 100,
                    ease: 'power-3',
                    repeat: 0,
                },
                {
                    targets: [spotlight2],
                    x: 617,
                    y: 203,
                    duration: 500,
                    ease: 'power-3',
                    repeat: 0,
                },
                {
                    targets: [spotlight2],
                    x: 280,
                    y: 384,
                    duration: 200,
                    ease: 'power-3',
                    repeat: 0,
                },
                {
                    targets: [spotlight2],
                    x: 174,
                    y: 500,
                    duration: 70,
                    ease: 'power-3',
                    repeat: 0,
                },
                {
                    targets: [spotlight2],
                    x: 263,
                    y: 622,
                    duration: 70,
                    ease: 'power-3',
                    repeat: 0,
                },
                {
                    targets: [spotlight2],
                    x: 1400,
                    y: 456,
                    duration: 700,
                    ease: 'power-3',
                    repeat: 0,
                }

            ]
        });
        // // -+ End of Spotlight Sprites +- // //

        // Text.
        this.textBG1 = this.add.sprite(960, 540, 'textBG4-11').setOrigin(0.5).setScale(1.3, 1.7);
        this.textBG1.alpha = 0.9
        this.text1 = this.add.rexBBCodeText(960, 540,
            `A talent is the natural ability to do something
well. Everyone has talents, maybe it is art,
sports, drama, writing, music, cooking,
dancing or being a leader.`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text1.scale = 0.5;


        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', () => {

            this.scene.start("Scene4_11B", { music: this.music });


        }, this);
        nextBtn.y = nextBtn.y - 40;

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_10", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40;

        // Save user progress.
        const save = new SaveProgress(this);
    }
}