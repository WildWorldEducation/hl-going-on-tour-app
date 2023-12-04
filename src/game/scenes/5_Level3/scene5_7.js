import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import CloseButton from '../Custom_Classes/CloseButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene5_7 extends Phaser.Scene {
    constructor() {
        super('Scene5_7');
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        //Sprites        
        this.load.image('x-mark', 'assets/Images/General/x-mark.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('bg-5-7', 'assets/Images/5_Level3/zoom-buildings.jpg');
        this.load.image('cactus', 'assets/Images/5_Level3/circled-images/cactus.png');
        this.load.image('comedy', 'assets/Images/5_Level3/circled-images/comedy.png');
        this.load.image('market', 'assets/Images/5_Level3/circled-images/market.png');
        this.load.image('stage', 'assets/Images/5_Level3/circled-images/stage.png');
        this.load.image('text-card-5-7', 'assets/Images/General/text-card3.png');
    }

    create() {
        // BG.
        var bg = this.add.sprite(0, 0, 'bg-5-7').setOrigin(0)

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 780, 150, 32);
        this.titleText = this.add.text(55, 75,
            `OR...go to some other Chicago sights?`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);






        var popupImage = this.add.image(400, 640, 'hip-hop-museum');
        popupImage.scale = 1.1
        popupImage.alpha = 0
        // Close button.     
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const closeBtn = new CloseButton(this, 1700, 380, 'x-mark', this.nextBtnAudio);
        closeBtn.on('pointerdown', function () {
            //Show circles.
            stage.setAlpha(1)
            stage.setInteractive()
            circleBorder1.setAlpha(1)
            comedy.setAlpha(1)
            comedy.setInteractive()
            circleBorder2.setAlpha(1)
            cactus.setAlpha(1)
            cactus.setInteractive()
            circleBorder3.setAlpha(1)
            market.setAlpha(1)
            market.setInteractive()
            circleBorder4.setAlpha(1)

            // Show popup.
            this.popupTextBg.setAlpha(0)
            this.popupTextBgBorder.setAlpha(0)
            this.popupHeading.setText('')
            this.popupText.setText(``)
            popupImage.setAlpha(0)
            closeBtn.alpha = 0
            closeBtn.disableInteractive()
        }, this);
        closeBtn.scale = 0.8
        closeBtn.alpha = 0
        closeBtn.disableInteractive()


        // Circles.
        // 1.       
        var stage = this.add.image(0, 0, 'stage');
        stage.setInteractive({ cursor: 'pointer' })
        stage.on('pointerdown', () => {
            //Hide circles.
            stage.setAlpha(0)
            stage.disableInteractive()
            circleBorder1.setAlpha(0)
            comedy.setAlpha(0)
            comedy.disableInteractive()
            circleBorder2.setAlpha(0)
            cactus.setAlpha(0)
            cactus.disableInteractive()
            circleBorder3.setAlpha(0)
            market.setAlpha(0)
            market.disableInteractive()
            circleBorder4.setAlpha(0)

            // Show popup.
            this.popupTextBg.setAlpha(1)
            this.popupTextBgBorder.setAlpha(1)
            this.popupHeading.setText('[b]Universal Hip Hop Museum[/b]')
            this.popupText.setText(`The Universal Hip Hop Museum  in the Bronx celebrates and
preserves the history of local and global Hip Hop to inspire,
empower, and promote understanding.

It was founded by Rocky Bucano and a group of iconic
entrepreneurs and artists including Kurtis Blow, Ice T, LL Cool J,
Nas, and many others.`)
            popupImage.setAlpha(1)
            closeBtn.alpha = 1
            closeBtn.setInteractive()
        });
        var circleBorder1 = this.add.graphics();
        circleBorder1.lineStyle(6, 0xffffff, 1);
        circleBorder1.strokeCircle(0, 0, 150);
        var circle1Ctnr = this.add.container(960 - 185 - 300 - 70, 650, [stage, circleBorder1]);

        // 2.        
        var comedy = this.add.image(0, 0, 'comedy');
        comedy.setInteractive({ cursor: 'pointer' })
        comedy.on('pointerdown', () => {
            //Hide circles.
            stage.setAlpha(0)
            stage.disableInteractive()
            circleBorder1.setAlpha(0)
            comedy.setAlpha(0)
            comedy.disableInteractive()
            circleBorder2.setAlpha(0)
            cactus.setAlpha(0)
            cactus.disableInteractive()
            circleBorder3.setAlpha(0)
            market.setAlpha(0)
            market.disableInteractive()
            circleBorder4.setAlpha(0)

            // Show popup.
            this.popupTextBg.setAlpha(1)
            this.popupTextBgBorder.setAlpha(1)
            this.popupHeading.setText('[b]comedy Show[/b]')
            this.popupText.setText(`An "comedy production" is a production of a play, musical,
or revue that appears in such a venue in New York City.

The comedy movement started in the 1950s as a reaction to
the perceived commercialism of Broadway and provided less
expensive venues for shows that have employed many future
Broadway artists.`)
            popupImage.setTexture('comedy')
            popupImage.setAlpha(1)
            closeBtn.alpha = 1
            closeBtn.setInteractive()
        });
        var circleBorder2 = this.add.graphics();
        circleBorder2.lineStyle(6, 0xffffff, 1);
        circleBorder2.strokeCircle(0, 0, 150);
        var circle2Ctnr = this.add.container(960 - 185, 650, [comedy, circleBorder2]);

        // 3.        
        var cactus = this.add.image(0, 0, 'cactus');
        cactus.setInteractive({ cursor: 'pointer' })
        cactus.on('pointerdown', () => {
            //Hide circles.
            stage.setAlpha(0)
            stage.disableInteractive()
            circleBorder1.setAlpha(0)
            comedy.setAlpha(0)
            comedy.disableInteractive()
            circleBorder2.setAlpha(0)
            cactus.setAlpha(0)
            cactus.disableInteractive()
            circleBorder3.setAlpha(0)
            market.setAlpha(0)
            market.disableInteractive()
            circleBorder4.setAlpha(0)

            // Show popup.
            this.popupTextBg.setAlpha(1)
            this.popupTextBgBorder.setAlpha(1)
            this.popupHeading.setText('[b]The Dream House[/b]')
            this.popupText.setText(`This "light and sound installation" has gone on in various forms
for over two decades and features music and lighting. The sound
and light can be experienced as a new form or new media: the
sound and light enironment.

Be prepared to encounter a new collection of pitches with every
move you make, as you encounter the various resonating sound
fields. Visitors have described "one of the most unusual things to
do in NYC."`)
            popupImage.setTexture('cactus')
            popupImage.setAlpha(1)
            closeBtn.alpha = 1
            closeBtn.setInteractive()
        });
        var circleBorder3 = this.add.graphics();
        circleBorder3.lineStyle(6, 0xffffff, 1);
        circleBorder3.strokeCircle(0, 0, 150);
        var circle3Ctnr = this.add.container(960 + 185, 650, [cactus, circleBorder3]);

        // 4.        
        var market = this.add.image(0, 0, 'market');
        market.setInteractive({ cursor: 'pointer' })
        market.on('pointerdown', () => {
            //Hide circles.
            stage.setAlpha(0)
            stage.disableInteractive()
            circleBorder1.setAlpha(0)
            comedy.setAlpha(0)
            comedy.disableInteractive()
            circleBorder2.setAlpha(0)
            cactus.setAlpha(0)
            cactus.disableInteractive()
            circleBorder3.setAlpha(0)
            market.setAlpha(0)
            market.disableInteractive()
            circleBorder4.setAlpha(0)

            // Show popup.
            this.popupTextBg.setAlpha(1)
            this.popupTextBgBorder.setAlpha(1)
            this.popupHeading.setText('[b]market Museum[/b]')
            this.popupText.setText(`Spy Scape is an interactive espionage museum that was
developed with the help of a "spymaster" and hackers, including
the illusive online group Anonymous. It puts you in situations that
actual secret agents have gone through and digitally tracks your
actions with a wristband, including making you go through a room
of green tripwire lasers like something out of "Mission
Impossible."`)
            popupImage.setTexture('market')
            popupImage.setAlpha(1)
            closeBtn.alpha = 1
            closeBtn.setInteractive()
        });
        var circleBorder4 = this.add.graphics();
        circleBorder4.lineStyle(6, 0xffffff, 1);
        circleBorder4.strokeCircle(0, 0, 150);
        var circle4Ctnr = this.add.container(960 + 185 + 300 + 70, 650, [market, circleBorder4]);

        // Instructions.
        var textBG = this.add.sprite(1350, 150, 'text-card-5-7').setOrigin(0.5).setAlpha(0.9)
        this.instructionText = this.add.rexBBCodeText(1350, 150,
            ` [b]Click on the images below[/b]
to explore some other sights
in Chicago!`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.instructionText.scale = 0.5

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene5_8");
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene5_6");
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}