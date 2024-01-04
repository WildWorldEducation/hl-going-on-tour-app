import CloseButton from '../Custom_Classes/CloseButton.js'

export default class Scene7_3C extends Phaser.Scene {
    constructor() {
        super('Scene7_3C');
    }
    init(data) {
        this.music = data.music;
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Music.
        this.load.audio("las-vegas-song", ["assets/Audio/Music/7_Level4/las-vegas-song.mp3"]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.        
        this.load.image('wood-bg', '/assets/Images/7_Level4/Backgrounds/background-4.jpg');
        this.load.image('x-mark', 'assets/Images/General/x-mark.png');
        this.load.image('wave', 'assets/Images/7_Level4/sprite/envelope/wave.png');
        this.load.image('text-bg-4-4', 'assets/Images/General/text-card.png');
        this.load.image('3blue-man', 'assets/Images/7_Level4/sprite/envelope/3blue-man.png');
        this.load.image('tile-border', 'assets/Images/7_Level4/sprite/envelope/tile-border.png');
        this.load.image('blank-envelope', 'assets/Images/4_Level2/stamps/envelope2.png');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('las-vegas-song');
            this.music.play();
            this.music.setVolume(0.4);
            this.music.loop = true
        }

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
            `[b]FACT 3[/b]`,
            { fontFamily: "Arial", fontSize: "78px", color: '#964B00', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.heading.scale = 0.5

        // Sub Tile
        this.subTile = this.add.rexBBCodeText(960, 345,
            `[b]Blue Man Group[/b]`,
            { fontFamily: "Arial", fontSize: "45px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.heading.scale = 0.5

        // Wave texture
        var wave = this.add.sprite(1390, 255, 'wave').setOrigin(0.5)

        // 3 blue man group
        var blueMan = this.add.sprite(640, 640, '3blue-man').setOrigin(0.5);
        blueMan.scale = 0.45;

        // Text
        this.text = this.add.text(1330, 650,
            "Whether you've heard of \nthem or not, it's exactly \n what it sounds \nlike...almost. \nYes, they are blue and\n yes they are a men in a \ngroup, but their\n performance is very \ndynamic.",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5

        // Close button.     
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const closeBtn = new CloseButton(this, 1920 - 80, 70 + 10, 'x-mark', this.nextBtnAudio);
        closeBtn.on('pointerdown', function () {
            this.scene.start('Scene7_3', { music: this.music });
        }, this);
    }
}