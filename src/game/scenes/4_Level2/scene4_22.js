import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene4_22 extends Phaser.Scene {
    constructor() {
        super('Scene4_22');
    }
    preload() {
        // Plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
        // Video.   
        this.load.video('vid4-7', 'assets/Videos/4_Level2/vid4-7.mp4');
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        //Sprites                
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('textBG4-22', 'assets/Images/General/text-card4.png');
    }

    create() {
        var clicks = 1

        // BG.
        this.cameras.main.setBackgroundColor("#959fe4");

        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 700, 150, 32);
        this.titleText = this.add.text(55, 75,
            `Diacetyl chemical = Popcorn Lung`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.titleText.scale = 0.5
        this.titleTextCtnr = this.add.container(0, 55, [this.textBg, this.titleText]);

        // Text background.
        var textCard = this.add.sprite(600, 640, 'textBG4-22').setOrigin(0.5).setAlpha(0.9).setScale(1.7)
        //Text.
        this.text = this.add.rexBBCodeText(600, 640,
            `A Harvard study found that most
nicotine in e-cigarettes contains a
[b]chemical called dactyl[/b], which [b]can
cause scarring of the air sacs[/b] in the
lungs. This causes airways to thicken
and become narrow, [b]making it harder
to breathe[/b]. This can lead to a disease
called "popcorn lung".

Remember [b]Breathing is the Most
Important Thig We Do As Humans[/b].

[b]Move the slider[/b] to learn more
about normal and a popcorn lung.`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000', align: 'center' }).setOrigin(0.5);
        // Dealing with text quality.
        this.text.scale = 0.5
        this.text
        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', () => {
            this.scene.start("Scene4_23");
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.        
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_21");
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}