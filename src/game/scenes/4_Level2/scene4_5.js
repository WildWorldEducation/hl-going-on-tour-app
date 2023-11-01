import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene4_5 extends Phaser.Scene {
    constructor() {
        super('Scene4_5');
    }
    preload() {
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        //Sprites
        this.load.image('bg-4-5', 'assets/Images/4_Level2/phone/bg.jpg');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('phone-4-5', 'assets/Images/4_Level2/phone/phone.png');
        this.load.image('map-marker', 'assets/Images/4_Level2/phone/map-marker.png');
    }

    create() {
        // BG.
        var bg = this.add.sprite(0, 0, 'bg-4-5').setOrigin(0)


        // Title.
        this.textBg = this.add.graphics();
        this.textBg.fillStyle(0xFFFFFF, 1);
        this.textBg.fillRoundedRect(-30, 0, 500, 150, 32);
        this.instructionText = this.add.text(55, 75,
            `What Would YOU Do?`,
            { fontFamily: "Arial", fontSize: "72px", color: '#000000' }).setOrigin(0.0, 0.5);
        // Dealing with text quality.
        this.instructionText.scale = 0.5
        this.instructionTextCtnr = this.add.container(0, 55, [this.textBg, this.instructionText]);

        // Phone
        var phone = this.add.sprite(960, 570, 'phone-4-5').setOrigin(0.5)
        var mapMarker1 = this.add.sprite(960, 450, 'map-marker').setOrigin(0.5)
        mapMarker1.setInteractive({
            useHandCursor: true
        });
        mapMarker1.on('pointerdown', () => {
            this.scene.start("Scene4_5A");
        });
        var mapMarker2 = this.add.sprite(800, 700, 'map-marker').setOrigin(0.5)
        mapMarker2.setInteractive({
            useHandCursor: true
        });
        mapMarker2.on('pointerdown', () => {
            this.scene.start("Scene4_5B");
        });
        var mapMarker3 = this.add.sprite(1210, 680, 'map-marker').setOrigin(0.5)
        mapMarker3.setInteractive({
            useHandCursor: true
        });
        mapMarker3.on('pointerdown', () => {
            this.scene.start("Scene4_5C");
        });
        var mapMarker4 = this.add.sprite(1010, 650, 'map-marker').setOrigin(0.5)
        mapMarker4.setInteractive({
            useHandCursor: true
        });
        mapMarker4.on('pointerdown', () => {
            this.scene.start("Scene4_5D");
        });
        var mapMarker5 = this.add.sprite(1070, 540, 'map-marker').setOrigin(0.5)
        mapMarker5.setInteractive({
            useHandCursor: true
        });
        mapMarker5.on('pointerdown', () => {
            this.scene.start("Scene4_5E");
        });
        var mapMarker6 = this.add.sprite(1040, 300, 'map-marker').setOrigin(0.5)
        mapMarker6.setInteractive({
            useHandCursor: true
        });
        mapMarker6.on('pointerdown', () => {
            this.scene.start("Scene4_5F");
        });

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene4_6");
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_4");
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}