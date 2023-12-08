import CloseButton from '../Custom_Classes/CloseButton.js'

export default class Scene8_2B extends Phaser.Scene {
    constructor() {
        super('Scene8_2B');
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.        
        this.load.image('wood-bg', 'assets/Images/8_Level5/Backgrounds/wood-background-blur.png');
        this.load.image('x-mark', 'assets/Images/General/x-mark.png');
        this.load.image('wave', 'assets/Images/7_Level4/sprite/envelope/wave.png');
        this.load.image('ice-skating-boot', 'assets/Images/8_Level5/Sprites/sub-envelope/ice-skating-boot.png');
        this.load.image('sport-shoes', 'assets/Images/8_Level5/Sprites/sub-envelope/sport-shoe.png'); // Because there is just one shoe in the sprite
        this.load.image('tile-border', 'assets/Images/7_Level4/sprite/envelope/tile-border.png');
        this.load.image('blank-envelope', 'assets/Images/4_Level2/stamps/envelope2.png');
    }

    create() {
        // BG.
        this.cameras.main.setBackgroundColor("#000000");
        const bg = this.add.sprite(0, 0, 'wood-bg').setOrigin(0);
        /** Having bg alpha on top of a color to make the darken effect */
        bg.alpha = 0.4;

        // Envelope
        const blankEnvelope = this.add.sprite(960, 540, 'blank-envelope').setOrigin(0.5);
        blankEnvelope.setScale(1.35);

        // Tile Border
        const tileBorder = this.add.sprite(960, 250, 'tile-border').setOrigin(0.5);
        tileBorder.setScale(0.91, 0.88);


        //Tile text.
        this.heading = this.add.rexBBCodeText(tileBorder.x, tileBorder.y,
            `[b]FACT 2[/b]`,
            { fontFamily: "Arial", fontSize: "78px", color: '#783a0d', align: 'center' }).setOrigin(0.5, -0.1);
        // Dealing with text quality.
        this.heading.setScale(0.5);

        // Wave texture
        const wave = this.add.sprite(1520, 265, 'wave').setOrigin(0.5);

        // sport shoes ( sprite just have one shoe SO WE HAVE TO HAVE TWO variables)
        const shoe1X = 677;
        const shoe1Y = 720;
        const sportShoe1 = this.add.sprite(shoe1X, shoe1Y, 'sport-shoes');
        sportShoe1.setScale(0.65);

        const sportShoe2 = this.add.sprite(shoe1X + 40, shoe1Y + 30, 'sport-shoes');
        sportShoe2.setScale(0.65);

        // ice skating boot
        const iceSkatingBoot = this.add.sprite(1230, 700, 'ice-skating-boot');
        iceSkatingBoot.setScale(0.86);

        // Instruction Text
        this.text = this.add.text(960, 410,
            `California is the only state to have hosted \nboth the Winter and Summer Olympics`,
            { fontFamily: "Arial", fontSize: "85px", color: '#000000', align: 'center', lineSpacing: 10 }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5;

        // Close button.     
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const closeBtn = new CloseButton(this, 1920 - 80, 70 + 10, 'x-mark', this.nextBtnAudio);
        closeBtn.on('pointerdown', function () {
            localStorage.setItem("stamp1", "true");
            this.scene.start('Scene8_2');
        }, this);
    }
}