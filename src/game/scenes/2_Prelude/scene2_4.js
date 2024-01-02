import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene2_4 extends Phaser.Scene {
    constructor() {
        super('Scene2_4');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Module music.
        this.load.audio('theme-module2', [
            'assets/Audio/Music/2_Prelude/theme-module2.mp3',
        ]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.
        this.load.image('instruments', 'assets/Images/2_Prelude/instruments.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('char1_2-4', 'assets/Images/2_Prelude/music-and-you/char1.png');
        this.load.image('char2_2-4', 'assets/Images/2_Prelude/music-and-you/char2.png');
        this.load.image('char3_2-4', 'assets/Images/2_Prelude/music-and-you/char3.png');
        this.load.image('yellow-pointer', 'assets/Images/General/yellow-pointer.png');
        // Sprite sheets.
        this.load.spritesheet('music-note-1', 'assets/Images/2_Prelude/music-and-you/music-note-1-spritesheet.png', { frameWidth: 360, frameHeight: 360 });
        this.load.spritesheet('music-note-2', 'assets/Images/2_Prelude/music-and-you/music-note-2-spritesheet.png', { frameWidth: 360, frameHeight: 360 });

    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module2');
            this.music.play();
            this.music.setVolume(0.1);
        }
        else if (!this.music.isPlaying) {
            this.music.resume();
        }

        // Background.
        var instruments = this.add.sprite(0, 0, 'instruments').setOrigin(0);
        instruments.displayWidth = this.sys.canvas.width;
        instruments.displayHeight = this.sys.canvas.height;



        // // - + - Sprite sheet animation that play when the circle is hover over - + - // //
        // Spritesheet animation.
        this.anims.create({
            key: "music-note-1",
            frameRate: 30,
            frames: this.anims.generateFrameNumbers("music-note-1", { start: 0, end: 70 }),
            repeat: -1,
            hideOnComplete: false
        });

        this.anims.create({
            key: "music-note-2",
            frameRate: 30,
            frames: this.anims.generateFrameNumbers("music-note-2", { start: 0, end: 47 }),
            repeat: -1,
            hideOnComplete: false
        });


        // Characters.
        // Char 1.
        const circle1 = this.add.circle(0, 0, 381, 0xffffff);
        const circle1Text = this.add.rexBBCodeText(0, 0, "When we show up\nin [b]the present\nmoment[/b] with all of\nour senses, we\ninvite the world to\nfill us with joy.",
            { fontFamily: "Arial", fontSize: "120px", color: '#000000', align: 'center' }).setOrigin(0.5, 0.5);
        circle1Text.scale = 0.5
        var char1 = this.add.image(0, 0, 'char1_2-4');
        // The animation that start when the user hover over the char
        const musicNoteOnCir1 = this.add.sprite(0, 0, "music-note-1").setAlpha(1).setScale(1.5);
        // event listener
        char1.setInteractive({ cursor: 'pointer' })
        char1.on('pointerdown', () => {
            char1.alpha = 0
        });
        char1.on('pointerover', () => {
            musicNoteOnCir1.setAlpha(1);
            musicNoteOnCir1.play('music-note-1');
        })

        char1.on('pointerout', () => {
            musicNoteOnCir1.setAlpha(0);
            musicNoteOnCir1.anims.stop();
        })

        // Circle border
        var circleBorder1 = this.add.graphics();
        circleBorder1.lineStyle(8, 0x26373c, 1);
        circleBorder1.strokeCircle(0, 0, 381);
        var circle1Ctnr = this.add.container(370, 740, [circle1, circle1Text, char1, circleBorder1, musicNoteOnCir1]);
        circle1Ctnr.scale = 0.7

        // Char 2.
        const circle2 = this.add.circle(0, 0, 381, 0xffffff);
        const circle2Text = this.add.rexBBCodeText(0, 0, "The pains of the\npast may be left\nbehind us and the\n[b]future unfolds[/b]\nahead of us.",
            { fontFamily: "Arial", fontSize: "120px", color: '#000000', align: 'center' }).setOrigin(0.5, 0.5);
        circle2Text.scale = 0.5;
        var char2 = this.add.image(0, 0, 'char2_2-4');
        const musicNoteOnCir2 = this.add.sprite(0, 0, "music-note-1").setScale(1.5).setAlpha(0);
        char2.setInteractive({ cursor: 'pointer' })
        char2.on('pointerdown', () => {
            char2.alpha = 0
        });
        char2.on('pointerover', () => {
            musicNoteOnCir2.setAlpha(1);
            musicNoteOnCir2.play('music-note-1');
        });
        char2.on('pointerout', () => {
            musicNoteOnCir2.setAlpha(0);
            musicNoteOnCir2.anims.stop();
        });
        var circleBorder2 = this.add.graphics();
        circleBorder2.lineStyle(8, 0x26373c, 1);
        circleBorder2.strokeCircle(0, 0, 381);
        var circle2Ctnr = this.add.container(970, 740, [circle2, circle2Text, char2, circleBorder2, musicNoteOnCir2]);
        circle2Ctnr.scale = 0.7;

        // Char 3.
        const circle3 = this.add.circle(0, 0, 381, 0xffffff);
        const circle3Text = this.add.rexBBCodeText(0, 0, "The [b]Now[/b] can be\nfull of beauty\nwaiting for our\nattention.",
            { fontFamily: "Arial", fontSize: "120px", color: '#000000', align: 'center' }).setOrigin(0.5, 0.5);
        circle3Text.scale = 0.5
        var char3 = this.add.image(0, 0, 'char3_2-4');
        const musicNoteOnCir3 = this.add.sprite(0, 0, "music-note-2").setScale(1.9).setAlpha(0);
        char3.setInteractive({ cursor: 'pointer' });
        char3.on('pointerdown', () => {
            char3.alpha = 0
        });
        char3.on('pointerover', () => {
            musicNoteOnCir3.setAlpha(1);
            musicNoteOnCir3.play('music-note-2');
        })
        char3.on('pointerout', () => {
            musicNoteOnCir3.setAlpha(0);
            musicNoteOnCir3.anims.stop();
        })
        var circleBorder3 = this.add.graphics();
        circleBorder3.lineStyle(8, 0x26373c, 1);
        circleBorder3.strokeCircle(0, 0, 381);
        var circle3Ctnr = this.add.container(1570, 740, [circle3, circle3Text, char3, circleBorder3, musicNoteOnCir3]);
        circle3Ctnr.scale = 0.7;

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene2_5", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene2_3");
        }, this);
        backBtn.y = backBtn.y - 40

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-20, 0, 700, 150, 32);
        this.instructionText = this.add.text(55, 75, "How does music make you feel?",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.instructionText.scale = 0.5
        this.instructionTextCtnr = this.add.container(0, 55, [this.textBg, this.instructionText]);

        // Content text.
        this.contentText = this.add.text(1200, 230,
            `Music can help us connect to a\nfeeling in the moment, to each other,\nand to the environment.\n 
Click on the cards below\nto learn more!`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.5, 0.5);
        // Dealing with text quality.
        this.contentText.scale = 0.5

        // - The pointer that animated in the scene - //
        const yellowPointer = this.add.sprite(1200, 0, 'yellow-pointer').setScale(0.3);
        yellowPointer.setAlpha(0);
        // pointer animation
        this.tweens.chain({
            tweens: [
                {
                    targets: yellowPointer,
                    alpha: 1,
                    duration: 0,
                    delay: 800,
                },
                {
                    targets: yellowPointer,
                    x: 400,
                    y: 700,
                    duration: 1200,
                    ease: 'Sine.easeInOut',
                },
                {
                    targets: yellowPointer,
                    scale: 0.2,
                    duration: 200
                },
                {
                    targets: yellowPointer,
                    scale: 0.3,
                    duration: 200
                },
                {
                    targets: yellowPointer,
                    alpha: 0,
                    duration: 600,
                    delay: 100
                }
            ]
        })



        // Save user progress.
        const save = new SaveProgress(this);
    };
}