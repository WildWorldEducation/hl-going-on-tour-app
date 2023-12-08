import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import BackButton from '../Custom_Classes/BackButton.js'

export default class Scene8_8 extends Phaser.Scene {
    constructor() {
        super('Scene8_8');
    }
    preload() {
        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // Video.
        this.load.video('vid8_8', 'assets/Videos/8_Level5/Scene8_8-vid.mp4');
        this.load.video('vid8_8-loop', 'assets/Videos/8_Level5/Scene8_8-vid-loop.mp4');

        // // Module music.
        this.load.audio("song-in-car", ["assets/Audio/SFX/8_Level5/road-trip/song-in-car.mp3"]);

        // // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        this.load.audio("man-scream", ["assets/Audio/SFX/8_Level5/road-trip/excited-man-scream.mp3"]);
        this.load.audio("car-engine-sound", ["assets/Audio/SFX/8_Level5/road-trip/car-engine-sound.mp3"]);
        this.load.audio("seatbelt-drag-sound", ["assets/Audio/SFX/8_Level5/road-trip/seatbelt-drag-sound.mp3"]);

        // Sprites.
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
    }

    create() {
        // Background
        this.cameras.main.setBackgroundColor("#000000"); // use a single color for background

        // Music
        // There no theme file 

        // Video
        this.vid = this.add.video(0, 0, 'vid8_8');
        this.vid.setOrigin(0);
        this.vid.play();

        this.vidLoop = this.add.video(0, 0, 'vid8_8-loop');
        this.vidLoop.setOrigin(0);

        // Audio
        this.songInCar = this.sound.add('song-in-car', { loop: true });
        this.manScream = this.sound.add('man-scream', { loop: false });
        this.carEngine = this.sound.add('car-engine-sound', { loop: false, volume: 0.5 });
        this.seatbeltDrag = this.sound.add('seatbelt-drag-sound', { loop: false, volume: 5 });

        // Title.
        this.tileBg = this.add.graphics();
        this.tileBg.fillStyle(0xFFFFFF, 1);
        this.tileBg.fillRoundedRect(-30, 0, 350, 150, 32);
        this.tileText = this.add.text(75, 75, "Road Trip",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.tileText.scale = 0.5;
        this.tileCtnr = this.add.container(0, 55, [this.tileBg, this.tileText]);

        // InstructionText Background. 
        this.instructionTextBg = this.add.sprite(800, 50, 'text-bg').setOrigin(0).setScale(1.21, 0.53);
        // Change instructionText opacity
        this.instructionTextBg.alpha = 0.9;
        // InstructionText
        this.instructionText = this.add.rexBBCodeText(this.instructionTextBg.x, this.instructionTextBg.y,
            // "Before you continue,\nmake sure your [b]sound is activated![/b]\nThen [b]click the Blue Arrow[/b]\non the right to continue.",
            "You've reached this portion of the national tour, and \n[b]now you have a few days, not just hours, in\n California![/b] Jump on the open road and explore.",
            { fontFamily: "Arial", fontSize: "75px", color: '#000000', align: 'center' }).setOrigin(-0.05, -0.56);
        // Dealing with text quality.
        this.instructionText.scale = 0.5

        /**
         * To archive the sound sequence like in the story book. We will play sounds asynchronous
         * And manual edit the time delay when play sound 
         * NOW the solution is to use call back with delay
         */
        // -- First the car engine is play --
        this.carEngine.play();

        // -- After a little time the seatbelt drag play
        this.time.addEvent({
            delay: 100,
            callback: () => {
                // play the failed sound after 500 ms
                this.seatbeltDrag.play();
            },
            loop: false
        });

        /** I added this section because it seem that the video end when the
         *  music still play on. So for the immersive sake I add a loop video 
         *  where 4 guys in the car are looking at each other and smiling
         */
        this.vid.on('complete', () => {
            console.log('Enter the loop');
            this.vidLoop.play(true);
        });

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            // Turn off all the sound currently playing
            this.manScream.stop();
            this.carEngine.stop();
            this.songInCar.stop();
            this.seatbeltDrag.stop();
            this.scene.start("Scene8_9", { music: this.music });
        }, this);

        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            // Turn off all the sound currently playing
            this.manScream.stop();
            this.carEngine.stop();
            this.songInCar.stop();
            this.seatbeltDrag.stop();
            this.scene.start("Scene8_7");
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);
    }

    update() {
        // addition condition to make sure the sound is only play once
        if (!this.carEngine.isPlaying && !this.songInCar.isPlaying) {
            this.songInCar.play();
            this.manScream.play();
        }
    }
}