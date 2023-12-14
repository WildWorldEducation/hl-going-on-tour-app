import CloseButton from '../Custom_Classes/CloseButton.js'
import WideButton from '../Custom_Classes/WideButton.js'

export default class Scene4_4C extends Phaser.Scene {
    constructor() {
        super('Scene4_4C');
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
        // Sprites.        
        this.load.image('wood-bg-4-4', 'assets/Images/4_Level2/stamps/wood-bg.jpg');
        this.load.image('x-mark', 'assets/Images/General/x-mark.png');
        this.load.image('text-bg-4-4', 'assets/Images/General/text-card.png');
        this.load.image('heading-border-4-4', 'assets/Images/4_Level2/stamps/heading-border.png');
        this.load.image('envelope2', 'assets/Images/4_Level2/stamps/envelope2.png');
        this.load.image('no-smoking-sticker', 'assets/Images/4_Level2/stamps/no-smoking-sticker.png');
        this.load.image('no-vaping-sticker', 'assets/Images/4_Level2/stamps/no-vaping-sticker.png');
        this.load.image('rubber-stamp', 'assets/Images/4_Level2/stamps/rubber-stamp.png');
        this.load.image('rubber-stamp2', 'assets/Images/4_Level2/stamps/rubber-stamp2.png');
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
        var bg = this.add.sprite(0, 0, 'wood-bg-4-4').setOrigin(0)

        // Envelope.
        var envelope2 = this.add.sprite(960, 540, 'envelope2').setOrigin(0.5)
        envelope2.scale = 1.4
        var rubberStamp = this.add.sprite(1400, 200, 'rubber-stamp').setOrigin(0)
        rubberStamp.angle = -5
        var rubberStamp2 = this.add.sprite(1250, 200, 'rubber-stamp2').setOrigin(0)
        var headingBorder = this.add.sprite(960, 240, 'heading-border-4-4').setOrigin(0.5)

        //Text.
        this.heading = this.add.rexBBCodeText(960, 265,
            `[b]FACT 3[/b]`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.heading.scale = 0.5

        this.subheading = this.add.rexBBCodeText(960, 350,
            `[b]Smoking indoors was banned[/b]`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.subheading.scale = 0.5

        this.text = this.add.text(960, 700,
            `Since 2003 New York State created the Clean Indoor Air Act (the Act) and
expanded it in 2017. The act prohibits smoking and vaping in almost all public
and private indoor workplaces, including restaurants and bars, to protect workers
and the publi from exposure to the harmful effects.`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5

        // Stickers.
        var noSmokingSticker = this.add.sprite(735, 480, 'no-smoking-sticker').setOrigin(0.5)
        var noVapingSticker = this.add.sprite(1185, 480, 'no-vaping-sticker').setOrigin(0.5)

        // Continue button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const contBtn = new WideButton(this, 0, 0, 'Continue', this.nextBtnAudio);
        contBtn.on('pointerdown', function () {
            this.text.setText(`Since 2003, the Act has protected millions of New Yorkers from daily exposure to
deadly secondhand smoke and vaping aerosols.
Studies show that in the first year alone, the expansion of the Act resulted in
about 3,800 fewer hospital admissions for heart attack, which saved an estimated
$56 million in heath care costs.`)

            contBtn.disableInteractive()
            contBtn.setAlpha(0)
        }, this);
        Phaser.Display.Align.In.Center(contBtn, this.add.zone(860, 1000, 1920, 1080));
        contBtn.y = contBtn.y - 170

        // Close button.             
        const closeBtn = new CloseButton(this, 1920 - 80, 70, 'x-mark', this.nextBtnAudio);
        closeBtn.on('pointerdown', function () {
            this.scene.start('Scene4_4', { music: this.music });
        }, this);
    }
}