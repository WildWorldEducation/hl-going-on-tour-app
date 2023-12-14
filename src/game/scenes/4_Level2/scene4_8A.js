/** 
 * I think This scene can be separate into a sub scene can benefit when we have to animate the lighting
 * And in the playbook design when you click back button in scene it will return to the stage with light
 * If you want make 4_8 in just one scene. That if we want to replicate the playbook when go back from Scene4_9 to Scene4_8,
 * we will have to pass the click variable back and forth those two scene.
*/
import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import CloseButton from '../Custom_Classes/CloseButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene4_8A extends Phaser.Scene {
    constructor() {
        super('Scene4_8A');
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
        //Sprites        
        this.load.image('x-mark', 'assets/Images/General/x-mark.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('bg-4-8', 'assets/Images/4_Level2/madison-square/madison-square.jpg');
        this.load.image('lights-4-8A', 'assets/Images/4_Level2/madison-square/lights-3.png');
        this.load.image('billboard-light', 'assets/Images/4_Level2/madison-square/billboard-light.png');
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
        var bg = this.add.sprite(0, 0, 'bg-4-8').setOrigin(0)

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 850, 150, 32);
        this.titleText = this.add.text(55, 75,
            `Welcome to NYC's Madison Square Garden!`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // -- Light Sprite Section -- //
        // Billboard light
        const billboardLight = this.add.sprite(933, 500, 'billboard-light').setScale(0.58).setAlpha(0.4);// We have to make alpha = 0.5 to achieve the faint look in the playbook design
        // Light strip
        const lightStrip = this.add.sprite(955, 540, 'lights-4-8A');
        // light container
        const lightCntr = this.add.container(0, 0, [billboardLight, lightStrip]);
        // Wait for 5 seconds and turn of the light container
        const lightchain = this.tweens.chain({
            tweens: [{
                targets: [lightCntr],
                alpha: 0,
                delay: 5000,
                duration: 550,
                ease: 'power-3',
                repeat: 0,
            },]
        });
        // -- End of Light Sprite Section


        // Text.
        this.text = this.add.text(940, 480,
            `Many artists have performed at "The Garden"
including: Jay-Z, Justin Bieber, Taylor Swift,
Twenty One Pilots, Beyonce, Michael Buble,
Harry Styles and so many more.`,
            { fontFamily: "Arial", fontSize: "84px", color: '#3f1121', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5



        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene4_9", { music: this.music });
            this.clicks++
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_8", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}