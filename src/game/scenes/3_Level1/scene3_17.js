import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_17 extends Phaser.Scene {
    constructor() {
        super('Scene3_17');
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
        // Sprites.     
        this.load.image('stars3-12', 'assets/Images/3_Level1/tickets/stars.png');
        this.load.image('notes-bg', 'assets/Images/3_Level1/notes-bg.png');
        this.load.image('tickets', 'assets/Images/3_Level1/tickets/tickets.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('text-card3-12', 'assets/Images/3_Level1/tickets/text-card.png');

        // Sprite sheets.
        this.load.spritesheet('sparkles3-17', 'assets/Images/3_Level1/genre-cards/sparkles1-spritesheet.png', { frameWidth: 530, frameHeight: 562 });
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module3');
            this.music.play();
            this.music.setVolume(0.1);
            this.music.loop = true
        }

        // BG. 
        this.cameras.main.setBackgroundColor("#959fe4");
        var bg = this.add.sprite(0, 0, 'notes-bg').setOrigin(0);
        bg.alpha = 0.5;

        // Stars.
        var stars = this.add.sprite(480, 120, 'stars3-12').setOrigin(0.5); //960 100
        stars.setScale(0.6);

        var tickets = this.add.sprite(450, 640, 'tickets').setOrigin(0.5);
        tickets.setScale(1);


        // Sparkles. --
        // Spritesheet animation.
        this.anims.create({
            key: "sparkles",
            frameRate: 30,
            frames: this.anims.generateFrameNumbers("sparkles3-17", { start: 0, end: 78 }),
            repeat: 0,
            hideOnComplete: true
        });

        this.anims.create({
            key: "sparkles-short",
            frameRate: 30,
            frames: this.anims.generateFrameNumbers("sparkles3-17", { start: 0, end: 46 }),
            repeat: 0,
            hideOnComplete: true
        });

        // ** First two sparkle will be at two side of the stars bar
        var sparkles1 = this.add.sprite(500, 80, "sparkles3-17").setAlpha(0);
        sparkles1.scale = 0.4;
        this.time.addEvent({
            delay: 1160,
            callback: () => {
                sparkles1.setAlpha(1);
                sparkles1.play("sparkles");
            },
            loop: false
        });
        sparkles1.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            sparkles1.destroy();
        });

        var sparkles2 = this.add.sprite(1300, 80, "sparkles3-17").setAlpha(0);
        sparkles2.scale = 0.4;
        this.time.addEvent({
            delay: 1360,
            callback: () => {
                sparkles2.play("sparkles");
                sparkles2.setAlpha(1);
            },
            loop: false
        })
        sparkles2.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            sparkles2.destroy();
        });




        // Next button.    
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene3_18", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_16");
        }, this);
        backBtn.y = backBtn.y - 40

        // Instructions.
        var instructionsBG = this.add.sprite(1250, 580, 'text-card3-12').setOrigin(0.5);
        instructionsBG.setScale(1.33, 1.25)
        this.instructionsText = this.add.rexBBCodeText(1250, 580,
            `Good job!

You won 5 tickets to the music tour!
Think about people in your network who 
you trust and who support you. These
are the people who should be in your
crew.

[b]Who would you take on tour,
including at least one adult? Why
would you take them on tour with
you?[/b]`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.instructionsText.scale = 0.5

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-50, 0, 300, 150, 32);
        this.titleText = this.add.text(55, 75, "Tickets",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        /* 
            We add all sprite that not starts container to a Big Container 
           So we can hide it until the stars animation is done
        */
        const sceneContainer = this.add.container(0, 0, [this.titleTextCtnr, instructionsBG, this.instructionsText, tickets, backBtn, nextBtn]).setAlpha(0);

        // ANIMATION CHAIN
        const starsChain = this.tweens.chain({
            tweens: [
                {
                    targets: stars,
                    x: 900,
                    y: 100,
                    duration: 600,
                    ease: 'Sine.easeInOut',
                },
                {
                    targets: sceneContainer,
                    alpha: 1,
                    duration: 200,
                    delay: 100
                }
            ]
        })

        /*
        Sparkles 3 will be the bottom of the tickets So it have to be below here
        */
        var sparkles3 = this.add.sprite(600, 880, "sparkles3-17").setAlpha(0);
        sparkles3.scale = 0.4;
        this.time.addEvent({
            delay: 1180,
            callback: () => {
                sparkles3.setAlpha(1);
                sparkles3.play("sparkles");
            },
            loop: false
        });
        sparkles3.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            sparkles3.destroy();
        });

        // ** Sparkles 4 will play after 123
        var sparkles4 = this.add.sprite(222, 310, "sparkles3-17").setAlpha(0);
        sparkles4.scale = 0.4;
        this.time.addEvent({
            delay: 4760,
            callback: () => {
                sparkles4.play("sparkles");
                sparkles4.setAlpha(1);
            },
            loop: false
        });
        sparkles4.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            sparkles4.destroy();
        });

        // SPARKLE 5 AND 6 will be appears after the sparkle 4 a bit. And will end quicker than previous sparkles 

        var sparkles5 = this.add.sprite(622, 210, "sparkles3-17").setAlpha(0);
        sparkles5.scale = 0.4;
        this.time.addEvent({
            delay: 4960,
            callback: () => {
                sparkles5.play("sparkles-short");
                sparkles5.setAlpha(1);
            },
            loop: false
        });
        sparkles5.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            sparkles5.destroy();
        });

        var sparkles6 = this.add.sprite(1222, 80, "sparkles3-17").setAlpha(0);
        sparkles6.scale = 0.4;
        this.time.addEvent({
            delay: 5260,
            callback: () => {
                sparkles6.play("sparkles-short");
                sparkles6.setAlpha(1);
            },
            loop: false
        });
        sparkles6.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            sparkles6.destroy();
        });

        // Save user progress.
        const save = new SaveProgress(this)
    }
}