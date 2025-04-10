import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_9 extends Phaser.Scene {
    constructor() {
        super('Scene3_9');
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
        this.load.audio("water-drop", ["assets/Audio/SFX/3_Level1/water-drop.mp3"]);
        // Sprites.
        this.load.image('piano', 'assets/Images/3_Level1/piano/piano.png');
        this.load.image('keyboard', 'assets/Images/3_Level1/piano/keyboard.png');
        this.load.image('violin', 'assets/Images/3_Level1/piano/violin.png');
        this.load.image('record-player', 'assets/Images/3_Level1/piano/record-player.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('text-card3-9', 'assets/Images/3_Level1/piano/text-card.png');
        this.load.image('yellow-pointer', 'assets/Images/General/yellow-pointer.png');
        this.load.image('star', 'assets/Images/3_Level1/piano/star.png')
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
        // Audio
        const waterDrop = this.sound.add('water-drop', { loop: false });

        // Piano bg.
        var piano = this.add.sprite(0, 0, 'piano').setOrigin(0);

        // //. . Circles Container . .// //
        // // circle 1 // //
        const circle1 = this.add.circle(0, 0, 250, 0xffffff);
        const circle1Text = this.add.text(0, 0, "Buy/Win free\ntickets to follow the\ntour",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.5, 0.5);
        circle1Text.scale = 0.5
        var keyboard = this.add.image(0, 0, 'keyboard');
        keyboard.setInteractive({ cursor: 'pointer' })
        keyboard.on('pointerdown', () => {
            waterDrop.play();
            keyboard.alpha = 0
            circleBorder1B.alpha = 1
        });
        var circleBorder1 = this.add.graphics();
        circleBorder1.lineStyle(6, 0xffffff, 1);
        circleBorder1.strokeCircle(0, 0, 250);
        var circleBorder1B = this.add.graphics();
        circleBorder1B.lineStyle(6, 0x34245b, 1);
        circleBorder1B.strokeCircle(0, 0, 250);
        circleBorder1B.alpha = 0;
        /** Star that blinking when user hover over the circle img bg */
        const star1A = this.add.sprite(-70, -160, 'star').setScale(0.05).setOrigin(0, 0).setAlpha(0);
        const star1B = this.add.sprite(120, 15, 'star').setScale(0.05).setOrigin(0, 0).setAlpha(0);

        /** We have to assign the tween to a constant to stop and star animation when hover  */
        const star1ATween = this.tweens.add({
            targets: star1A,
            alpha: 1,
            yoyo: true,
            duration: 700,
            ease: 'Cubic.easeInOut',
            repeat: -1,
            delay: 200
        })

        const star1BTween = this.tweens.add({
            targets: star1B,
            alpha: 1,
            yoyo: true,
            duration: 600,
            ease: 'Cubic.easeInOut',
            repeat: -1,
            delay: 800
        })

        /** Pause the tween until the user hover on the circle background */
        star1ATween.pause();
        star1BTween.pause();

        // The hover event of keyboard
        keyboard.on('pointerover', () => {
            // restart to make sure the start will blinking properly when re-hover
            star1ATween.restart();
            star1BTween.restart();
        })
        keyboard.on('pointerout', () => {
            // We cant stop the tween because it will destroy the tween
            // Pause and Restart is the solution
            star1ATween.pause();
            star1BTween.pause();
            // turn off alpha so the star will disappear when hover out
            star1A.setAlpha(0);
            star1B.setAlpha(0);
        })

        var circle1Ctnr = this.add.container(350, 750, [circle1, circle1Text, keyboard, circleBorder1, circleBorder1B, star1A, star1B]);

        // // End of Circle 1 // //

        // .. Circle 2 .. //
        const circle2 = this.add.circle(0, 0, 250, 0xffffff);
        const circle2Text = this.add.text(0, 0, "Work on your\nown musical\ntalents and beats\nto start your own\ntour",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.5, 0.5);
        circle2Text.scale = 0.5
        var recordPlayer = this.add.image(0, 0, 'record-player');
        recordPlayer.setInteractive({ cursor: 'pointer' })
        recordPlayer.on('pointerdown', () => {
            waterDrop.play();
            recordPlayer.alpha = 0
            circleBorder2B.alpha = 1
        });
        var circleBorder2 = this.add.graphics();
        circleBorder2.lineStyle(6, 0xffffff, 1);
        circleBorder2.strokeCircle(0, 0, 250);
        var circleBorder2B = this.add.graphics();
        circleBorder2B.lineStyle(6, 0x34245b, 1);
        circleBorder2B.strokeCircle(0, 0, 250);
        circleBorder2B.alpha = 0;
        /** Star that blinking when user hover over the circle img bg */
        const star2A = this.add.sprite(160, -108, 'star').setScale(0.05).setOrigin(0, 0).setAlpha(0);
        const star2B = this.add.sprite(- 150, -5, 'star').setScale(0.05).setOrigin(0, 0).setAlpha(0);

        /** We have to assign the tween to a constant to stop and star animation when hover  */
        const star2ATween = this.tweens.add({
            targets: star2A,
            alpha: 1,
            yoyo: true,
            duration: 700,
            ease: 'Cubic.easeInOut',
            repeat: -1,
            delay: 200
        })

        const star2BTween = this.tweens.add({
            targets: star2B,
            alpha: 1,
            yoyo: true,
            duration: 600,
            ease: 'Cubic.easeInOut',
            repeat: -1,
            delay: 800
        })

        /** Pause the tween until the user hover on the circle background */
        star2ATween.pause();
        star2BTween.pause();

        // The hover event of keyboard
        recordPlayer.on('pointerover', () => {
            // restart to make sure the start will blinking properly when re-hover
            star2ATween.restart();
            star2BTween.restart();
        })
        recordPlayer.on('pointerout', () => {
            // We cant stop the tween because it will destroy the tween
            // Pause and Restart is the solution
            star2ATween.pause();
            star2BTween.pause();
            // turn off alpha so the star will disappear when hover out
            star2A.setAlpha(0);
            star2B.setAlpha(0);
        })
        var circle2Ctnr = this.add.container(960, 750, [circle2, circle2Text, recordPlayer, circleBorder2, circleBorder2B, star2A, star2B]);
        // .. End Of Circle 2 .. //

        // -- Circle 3 -- //
        const circle3 = this.add.circle(0, 0, 250, 0xffffff);
        const circle3Text = this.add.text(0, 0, "Work for a tour\ncompany",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.5, 0.5);
        circle3Text.scale = 0.5
        var violin = this.add.image(0, 0, 'violin');
        violin.setInteractive({ cursor: 'pointer' })
        violin.on('pointerdown', () => {
            waterDrop.play();
            violin.alpha = 0;
            circleBorder3B.alpha = 1;
        });
        var circleBorder3 = this.add.graphics();
        circleBorder3.lineStyle(6, 0xffffff, 1);
        circleBorder3.strokeCircle(0, 0, 250);
        var circleBorder3B = this.add.graphics();
        circleBorder3B.lineStyle(6, 0x34245b, 1);
        circleBorder3B.strokeCircle(0, 0, 250);
        circleBorder3B.alpha = 0;
        /** Star that blinking when user hover over the circle img bg */
        const star3A = this.add.sprite(55, 95, 'star').setScale(0.05).setOrigin(0, 0).setAlpha(0);
        const star3B = this.add.sprite(-50, -115, 'star').setScale(0.05).setOrigin(0, 0).setAlpha(0);

        /** We have to assign the tween to a constant to stop and star animation when hover  */
        const star3ATween = this.tweens.add({
            targets: star3A,
            alpha: 1,
            yoyo: true,
            duration: 700,
            ease: 'Cubic.easeInOut',
            repeat: -1,
            delay: 200
        })

        const star3BTween = this.tweens.add({
            targets: star3B,
            alpha: 1,
            yoyo: true,
            duration: 600,
            ease: 'Cubic.easeInOut',
            repeat: -1,
            delay: 800
        })

        /** Pause the tween until the user hover on the circle background */
        star3ATween.pause();
        star3BTween.pause();

        // The hover event of keyboard
        violin.on('pointerover', () => {
            // restart to make sure the start will blinking properly when re-hover
            star3ATween.restart();
            star3BTween.restart();
        })
        violin.on('pointerout', () => {
            // We cant stop the tween because it will destroy the tween
            // Pause and Restart is the solution
            star3ATween.pause();
            star3BTween.pause();
            // turn off alpha so the star will disappear when hover out
            star3A.setAlpha(0);
            star3B.setAlpha(0);
        })
        var circle3Ctnr = this.add.container(1570, 750, [circle3, circle3Text, violin, circleBorder3, circleBorder3B, star3A, star3B]);
        // -- End Of Circle 3 -- //
        circle1Ctnr.setAlpha(0);
        circle2Ctnr.setAlpha(0);
        circle3Ctnr.setAlpha(0);
        this.add.tween({
            targets: [circle1Ctnr, circle2Ctnr, circle3Ctnr],
            alpha: 1,
            duration: 600,
            delay: 500
        });
        // // .. End Of Circles .. // // 

        // Instructions.
        this.instructionTextBg = this.add.sprite(850, 100, 'text-card3-9').setOrigin(0);
        this.instructionTextBg.scale = 1.3
        this.instructionTextBg.alpha = 0.8
        this.instructionText = this.add.rexBBCodeText(920, 230,
            "Below are a few ways you could travel on a\nmusical tour. Can you think of any others?\n[b]Click on the cards to learn more![/b]",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.0, 0.5);
        this.instructionText.scale = 0.5

        // - The pointer that animated in the scene - //
        const yellowPointer = this.add.sprite(1400, 0, 'yellow-pointer').setScale(0.4);
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
                    scale: 0.3,
                    duration: 300
                },
                {
                    targets: yellowPointer,
                    scale: 0.4,
                    duration: 300
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
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene3_10", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_8", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 700, 150, 32);
        this.instructionText = this.add.text(55, 75, "Ways to Get Yourself on Tour",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.instructionText.scale = 0.5
        this.instructionTextCtnr = this.add.container(0, 55, [this.textBg, this.instructionText]);

        // Save user progress.
        const save = new SaveProgress(this)
    }
}