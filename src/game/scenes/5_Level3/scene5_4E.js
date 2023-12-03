import CloseButton from '../Custom_Classes/CloseButton.js'

export default class Scene5_4E extends Phaser.Scene {
    constructor() {
        super('Scene5_4E');
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.        
        this.load.image('wood-bg', 'assets/Images/5_Level3/letter-scene/wood-bg.jpg');
        this.load.image('envelope2', 'assets/Images/5_Level3/letter-scene/envelope2.png');
        this.load.image('city-decal', 'assets/Images/5_Level3/letter-scene/city-decal.png');
        this.load.image('heading-border', 'assets/Images/5_Level3/letter-scene/heading-border.png');
        this.load.image('x-mark', 'assets/Images/General/x-mark.png');
        this.load.image('brownie', 'assets/Images/5_Level3/letter-scene/brownie.png');
        this.load.image('wavy', 'assets/Images/5_Level3/letter-scene/wavy.png');
    }

    create() {
        // BG.
        var bg = this.add.sprite(0, 0, 'wood-bg').setOrigin(0);
        var envelope2 = this.add.sprite(960, 540, 'envelope2').setOrigin(0.5);

        const heading_border = this.add.sprite(950, 275, 'heading-border').setOrigin(0.5);

        const wavy = this.add.sprite(1400, 260, 'wavy').setOrigin(0.5);


        const brownie = this.add.sprite(625, 650, 'brownie').setOrigin(0.5).setScale(0.45);

        //Text.
        this.heading = this.add.rexBBCodeText(950, 300,
            `[b]FACT 5[/b]`,
            { fontFamily: "Arial", fontSize: "84px", color: '#6E260E', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.heading.scale = 0.5

        this.subheading = this.add.rexBBCodeText(925, 400,
            `[b]The Brownie and the Twinkie were invented in Chicago[/b]`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.subheading.scale = 0.5;


        this.text = this.add.rexBBCodeText(1200, 675,
            `
            The Brownie was created by a pastry chef
            who wanted to make it easier to eat than pie,
            smaller than cake and easily served in boxed
            lunches.
            The Twinkie was originally filled with banana
            cream, but bananas were scarce during
            WWII, so vanilla cream was substituted.

            [b]What would you rather have,
            a brownie or a twinkie?[/b]
            `,
            { fontFamily: "Arial", fontSize: "76px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5;

        // Close button.     
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const closeBtn = new CloseButton(this, 1920 - 80, 70, 'x-mark', this.nextBtnAudio);
        closeBtn.on('pointerdown', function () {
            this.scene.start('Scene5_4');
        }, this);
    }
}