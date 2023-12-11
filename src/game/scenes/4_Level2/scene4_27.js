import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import BackButton from '../Custom_Classes/BackButton.js';
import ExclamationBtn from '../Custom_Classes/exclamationButton.js';


export default class Scene4_27 extends Phaser.Scene {
    constructor() {
        super('Scene4_27');
    }
    preload() {
        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // Video.


        // // Module music.


        // // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);


        // // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('bg-7-30', 'assets/Images/7_Level4/Backgrounds/background-8.png');
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('north-america-map', 'assets/Images/7_Level4/sprite/map/north-america-map.png');
        // dash line to form a path on map
        this.load.image('dash-line', 'assets/Images/7_Level4/sprite/map/white-dash-line-2.png');

        // pins on map
        this.load.image('pin-white', 'assets/Images/7_Level4/sprite/map/pin-white.png');
        this.load.image('pin-gray', 'assets/Images/7_Level4/sprite/map/pin-gray.png');
        this.load.image('pin-red', 'assets/Images/7_Level4/sprite/map/pin-red.png');
        this.load.image('pin-strong-red', 'assets/Images/4_Level2/pin-strong-red.png')
    }

    create() {
        // Background
        // The map is laid below the frame bg
        var naMap = this.add.sprite(923, 560, 'north-america-map').setScale(0.82);
        var bg = this.add.sprite(0, 0, 'bg-7-30').setOrigin(0);

        // Music
        // There no theme file 

        // Audio
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });

        // Title. //
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 545, 150, 32);
        this.tileText = this.add.text(75, 75, "Next stop... CHICAGO!",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);

        // Dash line to create a path across the map //


        const dashLine = this.add.sprite(1000, 570, 'dash-line').setScale(0.8);
        dashLine.setAngle(88);


        // End of dash line sprites //

        //+- Pins on the map -+ //
        // Pin 1 
        const pin1white = this.add.sprite(1078, 508, 'pin-white').setScale(0.28);
        const pin1gray = this.add.sprite(pin1white.x, pin1white.y, 'pin-gray').setScale(0.23);

        // Pin 2 
        const pin2white = this.add.sprite(915, 490, 'pin-white').setScale(0.28);
        const pin2redFocus = this.add.sprite(pin2white.x, pin2white.y, 'pin-strong-red').setScale(0.23);
        const pin2red = this.add.sprite(pin2white.x, pin2white.y, 'pin-red').setScale(0.23).setAlpha(0);

        pin2redFocus.setInteractive();
        //hover listener
        pin2redFocus.on('pointerover', () => {
            console.log('hover on there')
            pin2red.setAlpha(1);
        });
        pin2redFocus.on('pointerout', () => {
            pin2red.setAlpha(0);
        });
        /**
         * Add the blinking animation for white pin 2
         */
        const chain = this.tweens.chain({
            tweens: [
                {
                    targets: [pin2white],
                    alpha: 0,
                    duration: 1300,
                    loop: -1,
                    yoyo: true
                },
            ],
        });



        // Pin 3 
        const pin3white = this.add.sprite(680, 612, 'pin-white').setScale(0.28);
        const pin3gray = this.add.sprite(pin3white.x, pin3white.y, 'pin-gray').setScale(0.23);

        // Pin 4 
        const pin4white = this.add.sprite(637, 650, 'pin-white').setScale(0.28);
        const pin4gray = this.add.sprite(pin4white.x, pin4white.y, 'pin-gray').setScale(0.23);


        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_26");
        }, this);

        // Save user progress.
        // const save = new SaveProgress(this);
    }
}