import CloseButton from '../Custom_Classes/CloseButton.js'

export default class Scene4_4A extends Phaser.Scene {
    constructor() {
        super('Scene4_4A');
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
        this.load.image('wood-bg-4-4-blur', 'assets/Images/8_Level5/Backgrounds/wood-background-blur.png');
        this.load.image('x-mark', 'assets/Images/General/x-mark.png');
        this.load.image('text-bg-4-4', 'assets/Images/General/text-card.png');
        this.load.image('pizza-4-4', 'assets/Images/4_Level2/stamps/pizza.png');
        this.load.image('heading-border-4-4', 'assets/Images/4_Level2/stamps/heading-border.png');
        this.load.image('envelope2', 'assets/Images/4_Level2/stamps/envelope2.png');
        this.load.image('rubber-stamp', 'assets/Images/4_Level2/stamps/rubber-stamp.png');
        this.load.image('rubber-stamp2', 'assets/Images/4_Level2/stamps/rubber-stamp2.png');
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
        this.cameras.main.setBackgroundColor("#000000");
        var bg = this.add.sprite(0, 0, 'wood-bg-4-4-blur').setOrigin(0)
        bg.setAlpha(0.3); // we set alpha for bg on top of a camera color to make the veil effect
        var envelope2 = this.add.sprite(960, 540, 'envelope2').setOrigin(0.5)
        envelope2.scale = 1.4
        var rubberStamp = this.add.sprite(1400, 200, 'rubber-stamp').setOrigin(0)
        rubberStamp.angle = -5
        var rubberStamp2 = this.add.sprite(1250, 200, 'rubber-stamp2').setOrigin(0)
        var headingBorder = this.add.sprite(960, 240, 'heading-border-4-4').setOrigin(0.5)

        //Text.
        this.heading = this.add.rexBBCodeText(960, 265,
            `[b]FACT 1[/b]`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.heading.scale = 0.5

        var pizza = this.add.sprite(960, 550, 'pizza-4-4').setOrigin(0.5)

        this.subheading = this.add.rexBBCodeText(960, 350,
            `[b]New York Style pizza is world famous[/b]`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.subheading.scale = 0.5

        this.text = this.add.text(960, 800,
            `It is hand-tossed and known for it's wide slices
this crust.
What do you like on your pizza?`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5

        // Close button.     
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const closeBtn = new CloseButton(this, 1920 - 80, 70, 'x-mark', this.nextBtnAudio);
        closeBtn.on('pointerdown', function () {
            this.scene.start('Scene4_4', { music: this.music });
        }, this);
    }
}