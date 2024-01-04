import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene7_6 extends Phaser.Scene {
    constructor() {
        super('Scene7_6');
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
        this.load.audio("circle-click", ["assets/Audio/SFX/7_Level4/chime-sound.mp3"]);
        // Sprites.
        this.load.image('bg-7-6', 'assets/Images/7_Level4/Backgrounds/background-5.jpg');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('text-bg', 'assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('pointer', 'assets/Images/7_Level4/sprite/sensory-overload/yellow-pointer.png');
        this.load.image('cir1-pic', 'assets/Images/7_Level4/sprite/sensory-overload/hot-chili.png');
        this.load.image('cir2-pic', 'assets/Images/7_Level4/sprite/sensory-overload/touch-iron.png');
        this.load.image('cir3-pic', 'assets/Images/7_Level4/sprite/sensory-overload/foumart.png');
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
        var bg = this.add.sprite(0, 0, 'bg-7-6').setOrigin(0);


        // Circle Click sound
        this.circleClickAudio = this.sound.add("circle-click", { loop: false });

        // instructionText and it background sprite. 
        this.instructionTextBg = this.add.sprite(670, -180, 'text-bg').setOrigin(0).setScale(1.85, 1.04);
        this.instructionText = this.add.rexBBCodeText(837, 60,
            // "Before you continue,\nmake sure your [b]sound is activated![/b]\nThen [b]click the Blue Arrow[/b]\non the right to continue.",
            "There is a wide spectrum of how it affects people. \nCan you think of other examples of sensory overload? \nFlip the cards to see examples of the other possible \nsensory overload.", { fontFamily: "Arial", fontSize: "80px", color: '#000000', align: 'center' }).setOrigin(0, 0);
        // Dealing with text quality.
        this.instructionText.scale = 0.5
        this.instructionTextBg.setAlpha(0.9);
        // Instruction Container to animating
        const instructionCntr = this.add.container(0, 0, [this.instructionTextBg, this.instructionText]).setAlpha(0);
        this.tweens.add({
            targets: instructionCntr,
            alpha: 1,
            duration: 200,
            delay: 100
        })

        // Title.
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 600, 150, 32);
        this.tileText = this.add.text(75, 75, "What is Sensory Overload?",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);

        // Circle 1
        const r1 = this.add.circle(340, 760, 80, 0xffffffff);
        r1.setStrokeStyle(1.8, 0x2f434a);
        r1.setScale(2.9);
        this.cir1Text = this.add.rexBBCodeText(r1.x, r1.y,
            "Taste", { fontFamily: "Arial", fontSize: "110px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.cir1Text.scale = 0.5;

        r1.setInteractive({
            useHandCursor: true,
        });

        this.cir1Pic = this.add.sprite(r1.x, r1.y, 'cir1-pic').setOrigin(0.5).setScale(0.8);
        this.cir1Pic.alpha = 0;
        /**
         *   flag to determine visibility state of the pic and text inside the circle.
         *   If it set to true we show the pic and hide the text and vice versa
         */
        var circle1ShowPic = false;
        const cir1 = this.add.container(0, 0, [r1, this.cir1Text, this.cir1Pic]).setAlpha(0);
        r1.on('pointerdown', () => {
            // toggle the flag
            /** This line is called first so the first time player click in the circle it will show pic */
            circle1ShowPic = !circle1ShowPic;

            this.circleClickAudio.play();
            if (circle1ShowPic) {
                this.cir1Text.alpha = 0;
                this.cir1Pic.alpha = 1;
            } else {
                this.cir1Text.alpha = 1;
                this.cir1Pic.alpha = 0;
            }

        });

        // Circle 2
        const r2 = this.add.circle(940, 760, 80, 0xffffffff);
        r2.setStrokeStyle(1.8, 0x2f434a);
        r2.setScale(2.9);
        this.cir2Text = this.add.rexBBCodeText(r2.x, r2.y,
            "Touch", { fontFamily: "Arial", fontSize: "110px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.cir2Text.scale = 0.5;

        r2.setInteractive({
            useHandCursor: true,
        });

        this.cir2Pic = this.add.sprite(r2.x, r2.y, 'cir2-pic').setOrigin(0.5).setScale(0.663);
        this.cir2Pic.alpha = 0;
        /**
         *   flag to determine visibility state of the pic and text inside the circle.
         *   If it set to true we show the pic and hide the text and vice versa
         */
        var circle2ShowPic = false;
        const cir2 = this.add.container(0, 0, [r2, this.cir2Text, this.cir2Pic]).setAlpha(0);

        r2.on('pointerdown', () => {
            // toggle the flag
            /** This line is called first so the first time player click in the circle it will show pic */
            circle2ShowPic = !circle2ShowPic;

            this.circleClickAudio.play();
            if (circle2ShowPic) {
                this.cir2Text.alpha = 0;
                this.cir2Pic.alpha = 1;
            } else {
                this.cir2Text.alpha = 1;
                this.cir2Pic.alpha = 0;
            }

        });

        // Circle 3
        const r3 = this.add.circle(1540, 760, 80, 0xffffffff);
        r3.setStrokeStyle(1.8, 0x2f434a);
        r3.setScale(2.9);
        this.cir3Text = this.add.rexBBCodeText(r3.x, r3.y,
            "Smell", { fontFamily: "Arial", fontSize: "110px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.cir3Text.scale = 0.5;

        r3.setInteractive({
            useHandCursor: true,
        });

        this.cir3Pic = this.add.sprite(r3.x, r3.y, 'cir3-pic').setOrigin(0.5).setScale(0.16);
        this.cir3Pic.alpha = 0;
        /**
         *   flag to determine visibility state of the pic and text inside the circle.
         *   If it set to true we show the pic and hide the text and vice versa
         */
        var circle3ShowPic = false;
        const cir3 = this.add.container(0, 0, [r3, this.cir3Text, this.cir3Pic]).setAlpha(0)
        r3.on('pointerdown', () => {
            // toggle the flag
            /** This line is called first so the first time player click in the circle it will show pic */
            circle3ShowPic = !circle3ShowPic;

            this.circleClickAudio.play();
            if (circle3ShowPic) {
                this.cir3Text.alpha = 0;
                this.cir3Pic.alpha = 1;
            } else {
                this.cir3Text.alpha = 1;
                this.cir3Pic.alpha = 0;
            }

        });

        this.tweens.add({
            targets: [cir1, cir2, cir3],
            alpha: 1,
            duration: 300,
            delay: 800
        })


        // - The pointer that animated in the scene - //
        const yellowPointer = this.add.sprite(1200, 0, 'pointer').setScale(0.3);
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
        
        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_7", { music: this.music });
        }, this);

        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene7_5", { music: this.music });
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);
    }
}