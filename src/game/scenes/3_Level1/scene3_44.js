import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene3_44 extends Phaser.Scene {
    constructor() {
        super('Scene3_44');
    }

    init(data) {
        this.music = data.music;
    }

    preload() {
        // Module music.
        this.load.audio('theme-module3', [
            'assets/Audio/Music/3_Level1/theme-module3.mp3',
        ]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprites.
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('map-blur', 'assets/Images/3_Level1/map/map.png');
        this.load.image('map-na', 'assets/Images/3_Level1/map/map-NA.png')
        this.load.image('map-border', 'assets/Images/7_Level4/Backgrounds/background-8.png');
        this.load.image('magnifying-glass', 'assets/Images/3_Level1/map/magnifying-glass.png');
        // Map marker Sprites
        this.load.image('pin-gray', 'assets/Images/3_Level1/map/grey-marker.png');
        this.load.image('pin-red', 'assets/Images/3_Level1/map/red-marker-light.png');
        this.load.image('pin-strong-red', 'assets/Images/3_Level1/map/red-marker-dark.png');
        this.load.image('pin-white', '/assets/Images/3_Level1/map/white-marker-border.png'),
            // Video.
            this.load.video('vid21', 'assets/Videos/3_Level1/scene3-vid21.mp4');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('theme-module3');
            this.music.play();
            this.music.setVolume(0.1);
            this.music.loop = true;
        }

        // Video.
        const vid = this.add.video(0, 0, 'vid21');
        vid.setOrigin(0)
        vid.play();

        // Background
        const blurMap = this.add.sprite(0, 0, 'map-blur').setOrigin(0);
        blurMap.setAlpha(0);
        const naMap = this.add.sprite(923, 560, 'map-na').setScale(0.82);
        naMap.setAlpha(0);
        const mapBorder = this.add.sprite(0, 0, 'map-border').setOrigin(0);
        mapBorder.setAlpha(1);

        // Magnifying Glass
        const magnifyingGlass = this.add.sprite(-500, 1870, 'magnifying-glass'); //500 , 870

        // // -- Map Pins container -- // //

        // Pin 1 
        const pin1white = this.add.sprite(1078, 508, 'pin-white').setScale(0.28);
        const pin1redFocus = this.add.sprite(pin1white.x, pin1white.y, 'pin-strong-red').setScale(0.23);
        const pin1red = this.add.sprite(pin1white.x, pin1white.y, 'pin-red').setScale(0.23).setAlpha(0);

        pin1redFocus.setInteractive();
        //hover listener
        pin1redFocus.on('pointerover', () => {
            pin1red.setAlpha(1);
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";

        });
        pin1redFocus.on('pointerout', () => {
            pin1red.setAlpha(0);
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });

        pin1redFocus.on('pointerdown', () => {
            this.nextBtnAudio.play();
            this.scene.start("Scene3_45", { music: this.music });
        })
        /**
         * Add the blinking animation for white pin 2
         */
        const chain = this.tweens.chain({
            tweens: [
                {
                    targets: [pin1white],
                    alpha: 0,
                    duration: 1300,
                    loop: -1,
                    yoyo: true
                },
            ],
        });

        // Pin 2 
        const pin2white = this.add.sprite(915, 490, 'pin-white').setScale(0.28);
        const pin2gray = this.add.sprite(pin2white.x, pin2white.y, 'pin-gray').setScale(0.23);

        // Pin 3 
        const pin3white = this.add.sprite(680, 612, 'pin-white').setScale(0.28);
        const pin3gray = this.add.sprite(pin3white.x, pin3white.y, 'pin-gray').setScale(0.23);

        // Pin 4 
        const pin4white = this.add.sprite(637, 650, 'pin-white').setScale(0.28);
        const pin4gray = this.add.sprite(pin4white.x, pin4white.y, 'pin-gray').setScale(0.23);

        const pinsCtnr = this.add.container(0, 0, [pin1white, pin1redFocus, pin1red, pin2white, pin2gray, pin3white, pin3gray, pin4white, pin4gray]);
        pinsCtnr.setAlpha(0);


        /** After the vid done playing there are sequence of animation happen*/
        vid.on('complete', () => {
            const mapChain = this.tweens.chain({
                tweens: [
                    {
                        targets: blurMap,
                        alpha: 1,
                        duration: 200,
                        delay: 105
                    },
                    {
                        targets: blurMap,
                        alpha: 0,
                        duration: 200,
                        delay: 800
                    },
                ]
            });
            const magnifyingGlassChain = this.tweens.chain({
                tweens: [{
                    targets: magnifyingGlass,
                    x: 500,
                    y: 870,
                    duration: 1000,
                    delay: 200
                },
                {
                    targets: magnifyingGlass,
                    x: -500,
                    y: 1870,
                    duration: 1000,
                    delay: 600
                },]
            })
            const naMapChain = this.tweens.chain({
                tweens: [
                    {
                        targets: [mapBorder, naMap],
                        duration: 600,
                        delay: 1000,
                        alpha: 1
                    },
                    {
                        targets: pinsCtnr,
                        duration: 400,
                        delay: 600,
                        alpha: 1
                    }
                ]
            });

        })
        // Next button.     
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene3_45", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene3_43", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 650, 150, 32);
        this.titleText = this.add.text(55, 75, "Next stop... NEW YORK CITY!",
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Save user progress.
        const save = new SaveProgress(this)
    }
}