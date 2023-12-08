import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import BackButton from '../Custom_Classes/BackButton.js'

export default class Scene8_10 extends Phaser.Scene {
    constructor() {
        super('Scene8_10');
    }
    preload() {

        // Plugin. 
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // Video.

        // // Module music.

        // // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);


        // Sprites.
        this.load.image('bg-8-10', 'assets/Images/8_Level5/Backgrounds/background-2.png');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('text-bg', '/assets/Images/7_Level4/sprite/text-bg.png');
    }

    create() {
        /* Background in this scene is bigger than the screen and we need to scroll through it x axis 
           to achieve the scroll effect like in playbook. So we have to use tile sprite
        */
        this.bgTileSprite = this.add.tileSprite(0, 0, 0, 0, "bg-8-10").setOrigin(0)
            .setScrollFactor(0, 1) //this line keeps ours background from scrolling outside of camera bounds;

        this.scrollDistant = 300; // The distance we want to scroll
        this.traveledDistant = 0 // The distance meter we will use this and scroll distance later in update function

        // InstructionText Background. 
        this.instructionTextBg = this.add.sprite(510, 100, 'text-bg').setOrigin(0).setScale(1.16, 0.85);
        // Change instructionText opacity
        this.instructionTextBg.alpha = 0.84;
        // InstructionText
        this.instructionText = this.add.rexBBCodeText(this.instructionTextBg.x, this.instructionTextBg.y,
            "You\'re the master of your life, the captain of \nyour ship. Steer it with intention. \nWill you skirt the coast from one safe harbor \nto the next? Or will you sail into the vast \nopen blue? \nEvery day you get to decide anew what \ncourse to chart.",
            { fontFamily: "Arial", fontSize: "85px", color: '#000000', align: 'center' }).setOrigin(-0.045, -0.2);
        // Dealing with text quality.
        this.instructionText.scale = 0.5;

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene8_11", { music: this.music });
        }, this);

        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene8_9");
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);
    }
    update() {
        if (this.traveledDistant < this.scrollDistant) {
            this.bgTileSprite.tilePositionX += 5;
            console.log('scroll + ' + this.traveledDistant);
            this.traveledDistant += 5;
        }
    }
}