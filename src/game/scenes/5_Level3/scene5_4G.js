import CloseButton from '../Custom_Classes/CloseButton.js'

export default class Scene5_4G extends Phaser.Scene {
    constructor() {
        super('Scene5_4G');
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.        
        this.load.image('wood-bg', 'assets/Images/5_Level3/letter-scene/wood-bg.png');
        this.load.image('envelope2', 'assets/Images/5_Level3/letter-scene/envelope2.png');
        this.load.image('heading-border', 'assets/Images/5_Level3/letter-scene/heading-border.png');
        this.load.image('x-mark', 'assets/Images/General/x-mark.png');
        this.load.image('curtain', 'assets/Images/5_Level3/letter-scene/curtain.png');
        this.load.image('wavy', 'assets/Images/5_Level3/letter-scene/wavy.png');
    }

    create() {
        // BG.
        var bg = this.add.sprite(0, 0, 'wood-bg').setOrigin(0)
        var envelope2 = this.add.sprite(960, 540, 'envelope2').setOrigin(0.5)
        envelope2.scale = 1.4

        const heading_border = this.add.sprite(950, 275, 'heading-border').setOrigin(0.5);

        const wavy = this.add.sprite(1400, 250, 'wavy').setOrigin(0.5);

        const curtain = this.add.sprite(950, 575, 'curtain').setOrigin(0.5).setScale(0.65);


        //Text.
        this.heading = this.add.rexBBCodeText(950, 300,
            `[b]FACT 7[/b]`,
            { fontFamily: "Arial", fontSize: "84px", color: '#6E260E', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.heading.scale = 0.5

        this.text = this.add.text(900, 800,
            `
            Chicago has more than 200 theatres, 250 live music venues,
            and 200 professional dance companies.`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5

        // Close button.     
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const closeBtn = new CloseButton(this, 1920 - 80, 70, 'x-mark', this.nextBtnAudio);
        closeBtn.on('pointerdown', function () {
            this.scene.start('Scene5_4');
        }, this);
    }
}