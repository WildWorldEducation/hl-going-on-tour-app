import CloseButton from '../Custom_Classes/CloseButton.js'

export default class Scene4_5A extends Phaser.Scene {
    constructor() {
        super('Scene4_5F');
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.        
        this.load.image('x-mark', 'assets/Images/General/x-mark.png');
        this.load.image('bg-blurred-4-5', 'assets/Images/4_Level2/phone/bg-blurred.jpg');
        this.load.image('central-park', 'assets/Images/4_Level2/phone/central-park.png');
    }

    create() {
        // BG.
        var bg = this.add.sprite(0, 0, 'bg-blurred-4-5').setOrigin(0)

        //Text.        
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(960 - 800, 540 - 450, 1600, 900, 64);

        this.heading = this.add.rexBBCodeText(560, 340,
            `[b]Central Park[/b]`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.heading.scale = 0.5

        this.text1 = this.add.rexBBCodeText(560, 500,
            `Central Park is the most visited
urban park in the United States,
with an estimated 42 million
visitors annually, and is the [i]most
filmed location in the world.[/i]`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text1.scale = 0.5

        this.text2 = this.add.text(960, 780,
            `Strawberry Park, a location in the park, has a memorial for John Lennon,
            originally of the Beatles, and a known inspiration for many artists including
            Lady Gaga, Mary J. Blige, Bono, Stevie Wonder, John Legend, the Black
            Eyed Peas and the Weeknd, to name a few.`,
            { fontFamily: "Arial", fontSize: "84px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text2.scale = 0.5

        // image
        var image = this.add.sprite(1000, 160, 'central-park').setOrigin(0)

        // Close button.     
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const closeBtn = new CloseButton(this, 1920 - 240, 170, 'x-mark', this.nextBtnAudio);
        closeBtn.on('pointerdown', function () {
            this.scene.start('Scene4_5');
        }, this);
    }
}