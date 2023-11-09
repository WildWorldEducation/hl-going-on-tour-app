import CloseButton from '../Custom_Classes/CloseButton.js'

export default class Scene7_3B extends Phaser.Scene {
    constructor() {
        super('Scene7_3B');
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.        
        this.load.image('wood-bg', '/assets/Images/7_Level4/Backgrounds/background-4.png');
        this.load.image('x-mark', 'assets/Images/General/x-mark.png');
        this.load.image('wave', 'assets/Images/7_Level4/sprite/wave.png');

        this.load.image('text-bg-4-4', 'assets/Images/General/text-card.png');
        this.load.image('circus', 'assets/Images/7_Level4/sprite/circus.png');
        this.load.image('tile-border', 'assets/Images/7_Level4/sprite/tile-border.png');
        this.load.image('blank-envelope', 'assets/Images/4_Level2/stamps/envelope2.png');

    }

    create() {
        // BG.
        this.cameras.main.setBackgroundColor("#000000");
        var bg = this.add.sprite(0, 0, 'wood-bg').setOrigin(0);
        bg.alpha = 0.2;

        // Envelope
        var blankEnvelope = this.add.sprite(960, 540, 'blank-envelope').setOrigin(0.5)
        blankEnvelope.scale = 1.4;

        // Tile Border
        var tileBorder = this.add.sprite(960, 240, 'tile-border').setOrigin(0.5)
        tileBorder.setScale(1.05, 0.78);


        // Tile text.
        this.heading = this.add.rexBBCodeText(960, 265,
            `[b]FACT 2[/b]`,
            { fontFamily: "Arial", fontSize: "78px", color: '#964B00', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.heading.scale = 0.5

        // Sub Tile
        this.subTile = this.add.rexBBCodeText(1260, 395,
            `[b]Cirque du Soleil[/b]`,
            { fontFamily: "Arial", fontSize: "50px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.heading.scale = 0.5

        // Wave texture
        var wave = this.add.sprite(1540, 255, 'wave').setOrigin(0.5)

        // Circus
        var circus = this.add.sprite(495 + 19, 541, 'circus').setOrigin(0.5);
        circus.scale = 0.5;

        // Text
        this.text = this.add.text(1260, 630,
            `Or French for \"Circus of the Sun\", has grown to \nover 300 cities and 6 continents! This surreal \nart, music, magic, and circus mashup has been \n a crowd favorite around the world. \n\nThese shows in Las Vegas play to more than \n9000 people a night, adding to the over 100 \nmillion people who have seen Cirque du soleil \nproductions worldwide.`,
            { fontFamily: "Arial", fontSize: "65px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5

        // Close button.     
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const closeBtn = new CloseButton(this, 1920 - 80, 70 + 10, 'x-mark', this.nextBtnAudio);
        closeBtn.on('pointerdown', function () {
            localStorage.setItem("stamp2", "true");
            this.scene.start('Scene7_3');
        }, this);
    }
}