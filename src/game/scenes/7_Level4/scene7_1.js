import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import BackButton from '../Custom_Classes/BackButton.js'

export default class Scene7_1 extends Phaser.Scene {
    constructor() {
        super('Scene7_1');
    }
    init(data) {
        this.music = data.music;
    }
    preload() {
        // plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Music.
        this.load.audio("las-vegas-song", ["assets/Audio/Music/7_Level4/las-vegas-song.mp3"]);
        // // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('las-vegas-sign', '/assets/Images/7_Level4/sprite/las-vegas-sign.png');
        this.load.image('star', '/assets/Images/7_Level4/sprite/star.png');
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

        // Using one color as base background
        this.cameras.main.setBackgroundColor("#f9f2e8");
        // Background Sprite
        var vegasSign = this.add.sprite(50, 230, 'las-vegas-sign').setOrigin(0);
        vegasSign.setScale(1.4, 1.3);
        var star = this.add.sprite(175, 363, 'star').setOrigin(0);

        star.setScale(0.5);

        // Title.
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 535, 150, 32);
        this.tileText = this.add.text(75, 75, "Welcome to Las Vegas!",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);

        // instructionText . 
        this.instructionTextBg = this.add.sprite(1190, 18, 'text-bg').setOrigin(0.2, -0.1).setScale(0.8, 1.8);
        this.instructionText = this.add.rexBBCodeText(1220, 20,
            // "Before you continue,\nmake sure your [b]sound is activated![/b]\nThen [b]click the Blue Arrow[/b]\non the right to continue.",
            `Las Vegas, Nevada is known \nas one of the greatest \nentertainment hotspots in the \nworld.
            
             \n\nIn Vegas you can choose \nbetween watching chart-\ntopping musical acts, world \nclass dance acts, massive light \nshows and mind-bending magic \nshows!
            `,
            { fontFamily: "Arial", fontSize: "70px", color: '#000000', align: 'center' }).setOrigin(0.17, -0.40);
        // Dealing with text quality.
        this.instructionText.scale = 0.5
        // Hide the text and bg before animate
        this.instructionTextBg.alpha = 0
        this.instructionText.alpha = 0

        const chain = this.tweens.chain({
            tweens: [
                // {
                //     targets: [this.textBg],
                //     x: 220,
                //     ease: "power3",
                //     repeat: 0,
                //     duration: 500
                // },
                // {
                //     targets: [this.tileText],
                //     alpha: 1,
                //     repeat: 0,
                //     duration: 500
                // },
                {
                    targets: [this.instructionTextBg],
                    alpha: 1,
                    delay: 200,
                    duration: 1000,
                    repeat: 0,
                },
                {
                    targets: [this.instructionText],
                    alpha: 1,
                    duration: 100,
                    repeat: 0,
                },
            ],

        });

        const starChain = this.tweens.chain({
            tweens: [
                {
                    targets: star,
                    alpha: 0,
                    repeat: 0,
                    duration: 1000
                },
                {
                    targets: star,
                    alpha: 1,
                    repeat: 0,
                    duration: 1000
                },
                {
                    targets: star,
                    alpha: 0,
                    repeat: 0,
                    duration: 1000
                },
                {
                    targets: star,
                    alpha: 1,
                    repeat: 0,
                    duration: 1000
                },
            ],

        });

        // The flag for next button
        this.clicks = 0;
        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);

        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            // turn the instructionText back to the first state
            if (this.clicks == 1) {

                //show the back button
                backBtn.alpha = 1;
                this
                    .instructionText
                    .setText(
                        `Las Vegas, Nevada is known \nas one of the greatest \nentertainment hotspots in the \nworld.
            
             \n\nIn Vegas you can choose \nbetween watching chart-\ntopping musical acts, world \nclass dance acts, massive light \nshows and mind-bending magic \nshows!
            `)
                // render correct position and style for instruction text
                this.instructionText.setY(20);
                this.instructionText.setX(1220);
                this.instructionText.setOrigin(0.17, -0.40);
                this.instructionText.setStyle({ fontFamily: "Arial", fontSize: "70px", color: '#000000', align: 'center' });

                // render correct position and style for instruction text background
                this.instructionTextBg.setScale(0.8, 1.8);
                this.instructionTextBg.setY(-0.2);

                // Hide the new instruction 
                this.instructionText.alpha = 0;
                this.instructionTextBg.alpha = 0;
                // Animation for those two
                const chain2 = this.tweens.chain({
                    tweens: [
                        // {
                        //     targets: [this.tileText],
                        //     alpha: 1,
                        //     repeat: 0,
                        //     duration: 500
                        // },
                        {
                            targets: [this.instructionTextBg],
                            alpha: 1,
                            delay: 200,
                            duration: 1000,
                            repeat: 0,
                        },
                        {
                            targets: [this.instructionText],
                            alpha: 1,
                            duration: 100,
                            repeat: 0,
                        },
                    ],

                });
                // reset the clicks flag
                this.clicks = 0;
            }
        }, this);
        // Hide the back button for click 1
        backBtn.alpha = 0;

        // The next button will change the text in bg before go to next scene
        nextBtn.on('pointerdown', function () {
            this.instructionText.alpha = 1;
            if (this.clicks == 0) {
                //show the back button
                backBtn.alpha = 1;
                this
                    .instructionText
                    .setText(
                        "Many of the world's biggest starts \nhave had high profile shows \nin Las Vegas.\n\n From golden age stars of the past \nlike Elvis Presley and Frank \n Sinatra or more modern crowd-\npleasers such as Harry Styles, J\n-Lo, Adele, Usher, Drake, Bruno \n Mars, and even America's Got \nTalent, it's clear Vegas is a great \nplace to catch top talent from the \nentertainment world.")
                this.instructionText.setY(130);
                this.instructionText.setX(1195);
                this.instructionText.setStyle({ fontFamily: "Arial", fontSize: "70px", color: '#000000', align: 'center' });
                this.instructionTextBg.setScale(0.8, 1.6);
                this.instructionTextBg.setY(60);

                // Hide the new instruction 
                this.instructionText.alpha = 0;
                this.instructionTextBg.alpha = 0;
                // Animation for those two
                const chain2 = this.tweens.chain({
                    tweens: [
                        {
                            targets: [this.tileText],
                            alpha: 1,
                            repeat: 0,
                            duration: 500
                        },
                        {
                            targets: [this.instructionTextBg],
                            alpha: 1,
                            delay: 200,
                            duration: 1000,
                            repeat: 0,
                        },
                        {
                            targets: [this.instructionText],
                            alpha: 1,
                            duration: 100,
                            repeat: 0,
                        },
                    ],

                });

            }
            else if (this.clicks == 1) {
                this.scene.start("Scene7_2", { music: this.music });
            }
            this.clicks++
        }, this);


        // Save user progress.
        const save = new SaveProgress(this);
    }
}