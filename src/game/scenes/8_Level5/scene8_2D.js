import CloseButton from '../Custom_Classes/CloseButton.js'

export default class Scene8_2D extends Phaser.Scene {
    constructor() {
        super('Scene8_2D');
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
        this.load.image('coastline-sketch', 'assets/Images/8_Level5/Sprites/sub-envelope/coastline-sketch.png');
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
        const tileBorder = this.add.sprite(1240, 296, 'tile-border').setOrigin(0.5);
        tileBorder.setScale(0.91, 0.88);


        //Tile text.
        this.heading = this.add.rexBBCodeText(tileBorder.x, tileBorder.y,
            `[b]FACT 4[/b]`,
            { fontFamily: "Arial", fontSize: "78px", color: '#783a0d', align: 'center' }).setOrigin(0.5, -0.1);
        // Dealing with text quality.
        this.heading.setScale(0.5);

        // Wave texture
        const wave = this.add.sprite(1477, 370, 'wave').setOrigin(0.5);

        // Coastline sketch
        const coastlineSketch = this.add.sprite(560, 550, 'coastline-sketch').setScale(0.9);


        // Instruction Text
        this.text = this.add.text(1240, 640,
            `The entire coastline of \nCalifornia is an official \nnational monument \nnamed \"California \nCoastal National \nMonument.\"`,
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'center', lineSpacing: 13 }).setOrigin(0.5);
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