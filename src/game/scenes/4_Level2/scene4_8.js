import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import CloseButton from '../Custom_Classes/CloseButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene4_8 extends Phaser.Scene {
    constructor() {
        super('Scene4_8');
    }
    init(data) {
        this.music = data.music;
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Music.
        this.load.audio("nyc-song", ["assets/Audio/Music/4_Level2/nyc-song.mp3"]);
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Sprite sheets.
        this.load.spritesheet('lights-sprite-sheet', 'assets/Images/4_Level2/madison-square/light-spritesheet.png', { frameWidth: 1920, frameHeight: 1080 });
        //Sprites        
        this.load.image('x-mark', 'assets/Images/General/x-mark.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('bg-4-8', 'assets/Images/4_Level2/madison-square/madison-square.jpg');
        this.load.image('lights-4-8', 'assets/Images/4_Level2/madison-square/lights.png');
        this.load.image('billboard-light', 'assets/Images/4_Level2//madison-square/billboard-light.png');
    }

    create() {
        // Music.
        // Check if music is playing.
        if (typeof this.music == 'undefined') {
            this.music = this.sound.add('nyc-song');
            this.music.play();
            this.music.setVolume(0.5);
            this.music.loop = true
        }
        // For needing to click the "Next" button twice to proceed.
        this.clicks = 0;

        // BG.
        var bg = this.add.sprite(0, 0, 'bg-4-8').setOrigin(0);

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 850, 150, 32);
        this.titleText = this.add.text(55, 75,
            `Welcome to NYC's Madison Square Garden!`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5;
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // -- Light Sprite Section -- //
        // Billboard light
        const billboardLight = this.add.sprite(933, 500, 'billboard-light').setScale(0.58).setAlpha(0.4); // We have to make alpha = 0.5 to achieve the faint look in the playbook design
        // light container
        const lightCntr = this.add.container(0, 0, [billboardLight]).setAlpha(0);
        // -- End of Light Sprite Section -- //

        // Text.
        this.text = this.add.text(940, 480,
            `Madison Square Garden is a 20,000+ seat
venue. It is home to the New York Knicks
Basketball team and the New York Rangers
Hockey Team. It also hosts many musical acts.`,
            { fontFamily: "Arial", fontSize: "84px", color: '#3f1121', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5;
        this.text.alpha = 0;

        // -- Blinking Animation. -- //
        // Spritesheet animation.
        this.anims.create({
            key: "blinking",
            frameRate: 8,
            // Sprite sheet use number to indicate each frame
            // tell the animation manager to animate from frame 0 to frame 55 because it seem like this animation is shorter than in scene3_3
            frames: this.anims.generateFrameNumbers("lights-sprite-sheet", { start: 0, end: 3 }),
            repeat: 2,
            hideOnComplete: false
        });
        // -- End of animation section -- //

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.text.alpha = 1;
            lightCntr.setAlpha(1);

            const lightsBlinking = this.add.sprite(0, 0, "lights-sprite-sheet").setOrigin(0);
            this.time.addEvent({
                delay: 300,
                callback: () => {
                    lightsBlinking.play("blinking");
                }
            });
            lightCntr.add(lightsBlinking);
            // add the blinking to container 

            this.tweens.chain({
                tweens: [
                    // {
                    //     targets: [lightStrip],
                    //     alpha: 0,
                    //     duration: 1550,
                    //     ease: 'power-3',
                    //     // yoyo: true,
                    //     repeat: 3,
                    // },
                    {
                        targets: [lightCntr],
                        alpha: 0,
                        duration: 550,
                        ease: 'power-3',
                        delay: 4000
                    },
                ]
            });
            if (this.clicks >= 1) {
                this.scene.start("Scene4_8A", { music: this.music });
            }
            this.clicks++
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_6", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}