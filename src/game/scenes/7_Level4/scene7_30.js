import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import BackButton from '../Custom_Classes/BackButton.js';
import ExclamationBtn from '../Custom_Classes/exclamationButton.js';

export default class Scene7_30 extends Phaser.Scene {
    constructor() {
        super('Scene7_30');
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
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('bg-7-30', 'assets/Images/7_Level4/Backgrounds/background-8.png');
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('north-america-map', 'assets/Images/7_Level4/sprite/map/north-america-map.png');
        // dash line to form a path on map
        this.load.image('dash-line-1', 'assets/Images/7_Level4/sprite/map/white-dash-line-1.png');
        this.load.image('dash-line-2', 'assets/Images/7_Level4/sprite/map/white-dash-line-2.png');
        this.load.image('dash-line-3', 'assets/Images/7_Level4/sprite/map/white-dash-line-3.png');
        this.load.image('dash-line-4', 'assets/Images/7_Level4/sprite/map/white-dash-line-4.png');
        // pins on map
        this.load.image('pin-white', 'assets/Images/7_Level4/sprite/map/pin-white.png');
        this.load.image('pin-gray', 'assets/Images/7_Level4/sprite/map/pin-gray.png');
        this.load.image('pin-red', 'assets/Images/7_Level4/sprite/map/pin-red.png');
        this.load.image('pin-hover-red', 'assets/Images/3_Level1/map/red-marker-light.png')
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

        // Background
        // The map is laying below the frame bg
        var naMap = this.add.sprite(923, 560, 'north-america-map').setScale(0.82);
        var bg = this.add.sprite(0, 0, 'bg-7-30').setOrigin(0);

        // Music
        // There no theme file 

        // Audio
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });

        // Title. //
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 980, 150, 32);
        this.tileText = this.add.text(75, 75, "Las Vegas and X Games can be extreme! \nNow let's move on to the next show and theme!",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);

        // Dash line to create a path across the map //
        const dashLine1 = this.add.sprite(745, 645, 'dash-line-1');
        dashLine1.flipY = true;
        dashLine1.setAngle(1);

        const dashLine2 = this.add.sprite(1000, 570, 'dash-line-2').setScale(0.8);
        dashLine2.setAngle(88);

        const dashLine3 = this.add.sprite(870, 546, 'dash-line-3').setScale(0.5);
        dashLine3.setAngle(40);
        // End of dash line sprites //

        //+- Pins on the map -+ //
        // Pin 1 
        const pin1white = this.add.sprite(1078, 508, 'pin-white').setScale(0.28);
        const pin1gray = this.add.sprite(pin1white.x, pin1white.y, 'pin-gray').setScale(0.23);

        // Pin 2 
        const pin2white = this.add.sprite(930, 498, 'pin-white').setScale(0.28);
        const pin2gray = this.add.sprite(pin2white.x, pin2white.y, 'pin-gray').setScale(0.23);
        pin2gray.setInteractive();
        const pin2red = this.add.sprite(pin2white.x, pin2white.y, 'pin-red').setScale(0.23);
        pin2red.setAlpha(0);

        //hover listener
        pin2gray.on('pointerover', () => {
            pin2red.setAlpha(1);
        });
        pin2gray.on('pointerout', () => {
            pin2red.setAlpha(0);
        });

        // Pin 3 
        const pin3white = this.add.sprite(680, 612, 'pin-white').setScale(0.28);
        const pin3gray = this.add.sprite(pin3white.x, pin3white.y, 'pin-gray').setScale(0.23);

        // Pin 4 
        const pin4white = this.add.sprite(637, 650, 'pin-white').setScale(0.28).setAlpha(0);
        const pin4LightRed = this.add.sprite(pin4white.x, pin4white.y, 'pin-hover-red').setScale(0.23);
        const pin4red = this.add.sprite(pin4white.x, pin4white.y, 'pin-red').setScale(0.23);

        this.tweens.add({
            targets: pin4white,
            alpha: 1,
            duration: 1200,
            yoyo: true,
            repeat: -1
        })

        pin4red.setInteractive({
            useHandCursor: true,
        })

        pin4red.on('pointerdown', () => {
            this.scene.start('Scene8_1');
        })

        pin4red.on('pointerover', () => {

            pin4red.setAlpha(0.2)
        })

        pin4red.on('pointerout', () => {

            pin4red.setAlpha(1);
        })

        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene7_29", { music: this.music });
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);
    }
}