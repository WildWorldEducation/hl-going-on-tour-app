import CloseButton from '../Custom_Classes/CloseButton.js'

export default class Scene4_4B extends Phaser.Scene {
    constructor() {
        super('Scene4_4B');
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
        this.load.image('flags-4-4', 'assets/Images/4_Level2/stamps/flags.png');
        this.load.image('rubber-stamp', 'assets/Images/4_Level2/stamps/rubber-stamp.png');
        this.load.image('rubber-stamp2', 'assets/Images/4_Level2/stamps/rubber-stamp2.png')
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

        //Text.
        this.heading = this.add.rexBBCodeText(960, 265,
            `[b]FACT 2[/b]`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.heading.scale = 0.5

        this.subheading = this.add.rexBBCodeText(960, 700,
            `[b]NYC is considered one of
the most diverse places in the world[/b]`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.subheading.scale = 0.5

        var flags = this.add.sprite(960, 475, 'flags-4-4').setOrigin(0.5)

        this.text = this.add.text(960, 825,
            `NYC is the most ethnically diverse urban area in the world and is
also the most linguistically diverse city in the world.`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5

        // Close button.     
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const closeBtn = new CloseButton(this, 1920 - 80, 70, 'x-mark', this.nextBtnAudio);
        closeBtn.on('pointerdown', function () {
            this.scene.start('Scene4_4', { music: this.music });
        }, this);

        var rubberStamp = this.add.sprite(1400, 200, 'rubber-stamp').setOrigin(0)
        rubberStamp.angle = -5
        var rubberStamp2 = this.add.sprite(1250, 200, 'rubber-stamp2').setOrigin(0)
        var headingBorder = this.add.sprite(960, 240, 'heading-border-4-4').setOrigin(0.5)
    }
}