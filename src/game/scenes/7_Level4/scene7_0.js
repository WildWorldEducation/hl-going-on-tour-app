import UnlockModule from '../Custom_Classes/UnlockModule.js'
import SideButton from '../Custom_Classes/SideButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'
import BackButton from '../Custom_Classes/BackButton.js'

export default class Scene7_0 extends Phaser.Scene {
    constructor() {
        super('Scene7_0');
    }
    preload() {
        // plugin.
        this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);

        // // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);

        // Sprites.        
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('las-vegas-sign', '/assets/Images/7_Level4/sprite/las-vegas-sign.png');
        this.load.image('star', '/assets/Images/7_Level4/sprite/star.png');
    }

    create() {
        // Using one color as base background
        this.cameras.main.setBackgroundColor("#f9f2e8");
        // Background Sprite
        var vegasSign = this.add.sprite(50, 230, 'las-vegas-sign').setOrigin(0);
        vegasSign.setScale(1.4, 1.3);
        var star = this.add.sprite(175, 363, 'star').setOrigin(0);

        star.setScale(0.5);

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 500, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene7_1", { music: this.music });
        }, this);


        // Back button
        const backBtn = new BackButton(this, -60, 500, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_24");
        }, this);

        // Save user progress.
        const save = new SaveProgress(this);
    }
}