import CloseButton from '../Custom_Classes/CloseButton.js'

export default class Scene5_4B extends Phaser.Scene {
    constructor() {
        super('Scene5_4B');
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
        this.load.image('no-smoking', 'assets/Images/5_Level3/letter-scene/no-smoking.png');
        this.load.image('wavy', 'assets/Images/5_Level3/letter-scene/wavy.png');
    }

    create() {
        // BG.
        var bg = this.add.sprite(0, 0, 'wood-bg').setOrigin(0)
        var envelope2 = this.add.sprite(960, 540, 'envelope2').setOrigin(0.5)
        envelope2.scale = 1.4

        const heading_border = this.add.sprite(950, 275, 'heading-border').setOrigin(0.5);

        const wavy = this.add.sprite(1400, 250, 'wavy').setOrigin(0.5);

        //Text.
        this.heading = this.add.rexBBCodeText(950, 300,
            `[b]FACT 2[/b]`,
            { fontFamily: "Arial", fontSize: "84px", color: '#6E260E', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.heading.scale = 0.5

        //subheading
        this.subheading1 = this.add.rexBBCodeText(950, 400,
            `[b]Smoking indoors was banned[/b]`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality
        this.subheading1.scale = 0.5

        const no_smoking = this.add.sprite(950, 550, 'no-smoking').setOrigin(0.5).setScale(0.65);

        this.text = this.add.rexBBCodeText(900, 750,
            `
            Chicago has had its own [b]Clean Indoor Air Ordinance[/b] since 1988, and in 2014,
            the Chicago Clean Indoor Air Act was updated to include e-cigarettes and vapes
            in the law.
            `,
            { fontFamily: "Arial", fontSize: "76px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5

        this.text2 = this.add.text(900, 860,
            `
            Fines start at $250 and can reach $2,500 per offense for repeat offenders.
            `,
            { fontFamily: "Arial", fontSize: "76px", color: '#000000', align: 'center', fontStyle: 'bold' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text2.scale = 0.5

        // Close button.     
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const closeBtn = new CloseButton(this, 1920 - 80, 70, 'x-mark', this.nextBtnAudio);
        closeBtn.on('pointerdown', function () {
            this.scene.start('Scene5_4');
        }, this);
    }
}