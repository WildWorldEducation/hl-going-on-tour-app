import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import CloseButton from '../Custom_Classes/CloseButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene4_6 extends Phaser.Scene {
    constructor() {
        super('Scene4_6');
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        //Sprites        
        this.load.image('x-mark', 'assets/Images/General/x-mark.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('bg-4-6', 'assets/Images/4_Level2/unknown-areas/city-bg.png');
        this.load.image('hip-hop-museum', 'assets/Images/4_Level2/unknown-areas/hip-hop-museum.png');
        this.load.image('off-broadway', 'assets/Images/4_Level2/unknown-areas/off-broadway.png');
        this.load.image('dream-house', 'assets/Images/4_Level2/unknown-areas/dream-house.png');
        this.load.image('spyscape', 'assets/Images/4_Level2/unknown-areas/spyscape.png');
        this.load.image('text-card-4-6', 'assets/Images/General/text-card3.png');
    }

    create() {
        // BG.
        var bg = this.add.sprite(0, 0, 'bg-4-6').setOrigin(0)

        // Popups       
        this.popupTextBg = this.add.graphics();
        this.popupTextBg.fillStyle(0xFFFFFF, 1);
        this.popupTextBg.fillRoundedRect(960 - 800, 320, 1600, 650, 32);
        this.popupTextBg.alpha = 0
        this.popupTextBgBorder = this.add.graphics();
        this.popupTextBgBorder.lineStyle(6, 0x000000, 1);
        this.popupTextBgBorder.strokeRoundedRect(960 - 800, 320, 1600, 650, 32);
        this.popupTextBgBorder.alpha = 0

        this.popupHeading = this.add.rexBBCodeText(660, 460,
            ``,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0);
        // Dealing with text quality.
        this.popupHeading.scale = 0.5

        this.popupText = this.add.text(660, 540,
            ``,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0);
        // Dealing with text quality.
        this.popupText.scale = 0.5

        var popupImage = this.add.image(400, 640, 'hip-hop-museum');
        popupImage.scale = 1.1
        popupImage.alpha = 0
        // Close button.     
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const closeBtn = new CloseButton(this, 1700, 380, 'x-mark', this.nextBtnAudio);
        closeBtn.on('pointerdown', function () {
            //Show circles.
            hipHopMuseum.setAlpha(1)
            hipHopMuseum.setInteractive()
            circleBorder1.setAlpha(1)
            offBroadway.setAlpha(1)
            offBroadway.setInteractive()
            circleBorder2.setAlpha(1)
            dreamHouse.setAlpha(1)
            dreamHouse.setInteractive()
            circleBorder3.setAlpha(1)
            spyScape.setAlpha(1)
            spyScape.setInteractive()
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
        var hipHopMuseum = this.add.image(0, 0, 'hip-hop-museum');
        hipHopMuseum.setInteractive({ cursor: 'pointer' })
        hipHopMuseum.on('pointerdown', () => {
            //Hide circles.
            hipHopMuseum.setAlpha(0)
            hipHopMuseum.disableInteractive()
            circleBorder1.setAlpha(0)
            offBroadway.setAlpha(0)
            offBroadway.disableInteractive()
            circleBorder2.setAlpha(0)
            dreamHouse.setAlpha(0)
            dreamHouse.disableInteractive()
            circleBorder3.setAlpha(0)
            spyScape.setAlpha(0)
            spyScape.disableInteractive()
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
        var circle1Ctnr = this.add.container(960 - 185 - 300 - 70, 650, [hipHopMuseum, circleBorder1]);

        // 2.        
        var offBroadway = this.add.image(0, 0, 'off-broadway');
        offBroadway.setInteractive({ cursor: 'pointer' })
        offBroadway.on('pointerdown', () => {
            //Hide circles.
            hipHopMuseum.setAlpha(0)
            hipHopMuseum.disableInteractive()
            circleBorder1.setAlpha(0)
            offBroadway.setAlpha(0)
            offBroadway.disableInteractive()
            circleBorder2.setAlpha(0)
            dreamHouse.setAlpha(0)
            dreamHouse.disableInteractive()
            circleBorder3.setAlpha(0)
            spyScape.setAlpha(0)
            spyScape.disableInteractive()
            circleBorder4.setAlpha(0)

            // Show popup.
            this.popupTextBg.setAlpha(1)
            this.popupTextBgBorder.setAlpha(1)
            this.popupHeading.setText('[b]Off-Broadway Show[/b]')
            this.popupText.setText(`An "off-Broadway production" is a production of a play, musical,
or revue that appears in such a venue in New York City.

The off-Broadway movement started in the 1950s as a reaction to
the perceived commercialism of Broadway and provided less
expensive venues for shows that have employed many future
Broadway artists.`)
            popupImage.setTexture('off-broadway')
            popupImage.setAlpha(1)
            closeBtn.alpha = 1
            closeBtn.setInteractive()
        });
        var circleBorder2 = this.add.graphics();
        circleBorder2.lineStyle(6, 0xffffff, 1);
        circleBorder2.strokeCircle(0, 0, 150);
        var circle2Ctnr = this.add.container(960 - 185, 650, [offBroadway, circleBorder2]);

        // 3.        
        var dreamHouse = this.add.image(0, 0, 'dream-house');
        dreamHouse.setInteractive({ cursor: 'pointer' })
        dreamHouse.on('pointerdown', () => {
            //Hide circles.
            hipHopMuseum.setAlpha(0)
            hipHopMuseum.disableInteractive()
            circleBorder1.setAlpha(0)
            offBroadway.setAlpha(0)
            offBroadway.disableInteractive()
            circleBorder2.setAlpha(0)
            dreamHouse.setAlpha(0)
            dreamHouse.disableInteractive()
            circleBorder3.setAlpha(0)
            spyScape.setAlpha(0)
            spyScape.disableInteractive()
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
            popupImage.setTexture('dream-house')
            popupImage.setAlpha(1)
            closeBtn.alpha = 1
            closeBtn.setInteractive()
        });
        var circleBorder3 = this.add.graphics();
        circleBorder3.lineStyle(6, 0xffffff, 1);
        circleBorder3.strokeCircle(0, 0, 150);
        var circle3Ctnr = this.add.container(960 + 185, 650, [dreamHouse, circleBorder3]);

        // 4.        
        var spyScape = this.add.image(0, 0, 'spyscape');
        spyScape.setInteractive({ cursor: 'pointer' })
        spyScape.on('pointerdown', () => {
            //Hide circles.
            hipHopMuseum.setAlpha(0)
            hipHopMuseum.disableInteractive()
            circleBorder1.setAlpha(0)
            offBroadway.setAlpha(0)
            offBroadway.disableInteractive()
            circleBorder2.setAlpha(0)
            dreamHouse.setAlpha(0)
            dreamHouse.disableInteractive()
            circleBorder3.setAlpha(0)
            spyScape.setAlpha(0)
            spyScape.disableInteractive()
            circleBorder4.setAlpha(0)

            // Show popup.
            this.popupTextBg.setAlpha(1)
            this.popupTextBgBorder.setAlpha(1)
            this.popupHeading.setText('[b]Spyscape Museum[/b]')
            this.popupText.setText(`Spy Scape is an interactive espionage museum that was
developed with the help of a "spymaster" and hackers, including
the illusive online group Anonymous. It puts you in situations that
actual secret agents have gone through and digitally tracks your
actions with a wristband, including making you go through a room
of green tripwire lasers like something out of "Mission
Impossible."`)
            popupImage.setTexture('spyscape')
            popupImage.setAlpha(1)
            closeBtn.alpha = 1
            closeBtn.setInteractive()
        });
        var circleBorder4 = this.add.graphics();
        circleBorder4.lineStyle(6, 0xffffff, 1);
        circleBorder4.strokeCircle(0, 0, 150);
        var circle4Ctnr = this.add.container(960 + 185 + 300 + 70, 650, [spyScape, circleBorder4]);


        // Instructions.
        var textBG = this.add.sprite(1350, 150, 'text-card-4-6').setOrigin(0.5).setAlpha(0.8)
        this.instructionText = this.add.rexBBCodeText(1350, 150,
            `[b]Click on the images below[/b] to
explore some more unknown
areas in New York City!`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.instructionText.scale = 0.5

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 900, 150, 32);
        this.titleText = this.add.text(55, 75,
            `OR...go to some of the more unknown areas?`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene4_7");
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_5");
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}