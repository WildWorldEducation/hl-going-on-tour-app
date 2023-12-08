import CloseButton from '../Custom_Classes/CloseButton.js'

export default class Scene8_2C extends Phaser.Scene {
    constructor() {
        super('Scene8_2C');
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
        this.load.image('redwood-forest', 'assets/Images/8_Level5/Sprites/sub-envelope/redwood-forest.png') // Because there is just one shoe in the sprite
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
            `[b]FACT 3[/b]`,
            { fontFamily: "Arial", fontSize: "78px", color: '#783a0d', align: 'center' }).setOrigin(0.5, -0.1);
        // Dealing with text quality.
        this.heading.setScale(0.5);

        // Wave texture
        const wave = this.add.sprite(1375, 265, 'wave').setOrigin(0.5);

        // Redwood forest
        const redwoodForest = this.add.sprite(670, 630, 'redwood-forest').setScale(0.8);


        // Instruction Text
        this.text = this.add.text(1325, 595,
            `The Redwood Forest is \nhost to the oldest and \ntallest trees on Earth. \nSome are over 380 feet \ntall, similar to the height \nof a 38 story building!`,
            { fontFamily: "Arial", fontSize: "85px", color: '#000000', align: 'center', lineSpacing: 13 }).setOrigin(0.5);
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