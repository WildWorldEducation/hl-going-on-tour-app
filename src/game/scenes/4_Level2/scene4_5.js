import SideButton from '../Custom_Classes/SideButton.js'
import BackButton from '../Custom_Classes/BackButton.js'
import SaveProgress from '../Custom_Classes/SaveProgress.js'

export default class Scene4_5 extends Phaser.Scene {
    constructor() {
        super('Scene4_5');
    }
    init(data) {
        this.isOpened = data.isOpened; // a variable to tell that if this scene is opened before or not
        this.music = data.music;
    }
    preload() {
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);
        // Music.
        this.load.audio("nyc-song", ["assets/Audio/Music/4_Level2/nyc-song.mp3"]);
        //Sprites
        this.load.image('bg-4-5', 'assets/Images/4_Level2/phone/bg.jpg');
        this.load.image('next-arrow', 'assets/Images/General/next-arrow.png');
        this.load.image('phone-4-5', 'assets/Images/4_Level2/phone/phone.png');
        this.load.image('map-marker', 'assets/Images/4_Level2/phone/map-marker.png');
        this.load.image('white-map-marker', 'assets/Images/7_Level4/sprite/map/pin-white.png');
        this.load.image('map-marker-focus', 'assets/Images/7_Level4/sprite/map/pin-red.png');
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

        // BG.
        var bg = this.add.sprite(0, 0, 'bg-4-5').setOrigin(0)
        // Audio
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
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
        /** If the scene is opened before we don`t have to  animate the phone so it position will be different*/
        let phoneX, phoneY;
        if (this.isOpened) {
            phoneX = 960;
            phoneY = 570
        } else {
            phoneX = 830;
            phoneY = 1670;
        }
        var phone = this.add.sprite(phoneX, phoneY, 'phone-4-5').setOrigin(0.5)
        // // --++ Map markers ++-- // // 

        // -- map marker 1 -- //
        var mapMarker1 = this.add.sprite(960, 450, 'map-marker').setOrigin(0.5);
        const mapMarker1Focus = this.add.sprite(960, 450, 'map-marker-focus').setOrigin(0.5).setScale(0.19).setAlpha(0);
        const grayMapMarker1 = this.add.sprite(960, 450 + 3, 'white-map-marker').setScale(0.23);
        // interactive event listener
        mapMarker1.setInteractive({
            useHandCursor: true
        });
        mapMarker1.on('pointerdown', () => {
            this.nextBtnAudio.play();
            this.scene.start("Scene4_5A");
        });
        mapMarker1.on('pointerover', () => {
            mapMarker1Focus.setAlpha(1);
        });
        mapMarker1.on('pointerout', () => {
            mapMarker1Focus.setAlpha(0);
        });
        // -- map marker 2 -- //
        var mapMarker2 = this.add.sprite(800, 700, 'map-marker').setOrigin(0.5);
        const mapMarker2Focus = this.add.sprite(800, 700, 'map-marker-focus').setOrigin(0.5).setScale(0.19).setAlpha(0);
        const grayMapMarker2 = this.add.sprite(800, 700 + 3, 'white-map-marker').setScale(0.23);
        // interactive event listener
        mapMarker2.setInteractive({
            useHandCursor: true
        });
        mapMarker2.on('pointerdown', () => {
            this.nextBtnAudio.play();
            this.scene.start("Scene4_5B");
        });
        mapMarker2.on('pointerover', () => {
            mapMarker2Focus.setAlpha(1);
        });
        mapMarker2.on('pointerout', () => {
            mapMarker2Focus.setAlpha(0);
        });
        // -- map marker 3 -- //
        var mapMarker3 = this.add.sprite(1210, 680, 'map-marker').setOrigin(0.5);
        const mapMarker3Focus = this.add.sprite(1210, 680, 'map-marker-focus').setOrigin(0.5).setScale(0.19).setAlpha(0);
        const grayMapMarker3 = this.add.sprite(1210, 680 + 3, 'white-map-marker').setScale(0.23);
        // interactive event listener
        mapMarker3.setInteractive({
            useHandCursor: true
        });
        mapMarker3.on('pointerdown', () => {
            this.nextBtnAudio.play();
            this.scene.start("Scene4_5C");
        });
        mapMarker3.on('pointerover', () => {
            mapMarker3Focus.setAlpha(1);
        });
        mapMarker3.on('pointerout', () => {
            mapMarker3Focus.setAlpha(0);
        });
        // -- map marker 4 -- //
        var mapMarker4 = this.add.sprite(1010, 650, 'map-marker').setOrigin(0.5);
        const mapMarker4Focus = this.add.sprite(1010, 650, 'map-marker-focus').setOrigin(0.5).setScale(0.19).setAlpha(0);
        const grayMapMarker4 = this.add.sprite(1010, 650 + 3, 'white-map-marker').setScale(0.23);
        mapMarker4.setInteractive({
            useHandCursor: true
        });
        mapMarker4.on('pointerdown', () => {
            this.nextBtnAudio.play();
            this.scene.start("Scene4_5D");
        });
        mapMarker4.on('pointerover', () => {
            mapMarker4Focus.setAlpha(1);
        });
        mapMarker4.on('pointerout', () => {
            mapMarker4Focus.setAlpha(0);
        });
        // -- map marker 5 -- // 
        var mapMarker5 = this.add.sprite(1070, 540, 'map-marker').setOrigin(0.5);
        const mapMarker5Focus = this.add.sprite(1070, 540, 'map-marker-focus').setOrigin(0.5).setScale(0.19).setAlpha(0);
        const grayMapMarker5 = this.add.sprite(1070, 540 + 3, 'white-map-marker').setScale(0.23);
        mapMarker5.setInteractive({
            useHandCursor: true
        });
        mapMarker5.on('pointerdown', () => {
            this.nextBtnAudio.play();
            this.scene.start("Scene4_5E");
        });
        mapMarker5.on('pointerover', () => {
            mapMarker5Focus.setAlpha(1);
        });
        mapMarker5.on('pointerout', () => {
            mapMarker5Focus.setAlpha(0);
        });
        // -- map marker 6 -- //
        var mapMarker6 = this.add.sprite(1040, 300, 'map-marker').setOrigin(0.5);
        const mapMarker6Focus = this.add.sprite(1040, 300, 'map-marker-focus').setOrigin(0.5).setScale(0.19).setAlpha(0);
        const grayMapMarker6 = this.add.sprite(1040, 300 + 3, 'white-map-marker').setScale(0.23);

        mapMarker6.setInteractive({
            useHandCursor: true
        });
        mapMarker6.on('pointerdown', () => {
            this.nextBtnAudio.play();
            this.scene.start("Scene4_5F");
        });
        mapMarker6.on('pointerover', () => {
            mapMarker6Focus.setAlpha(1);
        });
        mapMarker6.on('pointerout', () => {
            mapMarker6Focus.setAlpha(0);
        });

        // map marker container
        this.whiteMapMarkerCntr = this.add.container(0, 0, [grayMapMarker1, grayMapMarker2, grayMapMarker3, grayMapMarker4, grayMapMarker5, grayMapMarker6]);
        this.mapMarkerCntr = this.add.container(0, 0, [mapMarker1, mapMarker2, mapMarker3, mapMarker4, mapMarker5, mapMarker6]);
        this.mapMarkerFocusCntr = this.add.container(0, 0, [mapMarker1Focus, mapMarker2Focus, mapMarker3Focus, mapMarker4Focus, mapMarker5Focus, mapMarker6Focus,])
        // We hide the map makers if this is the first time we open the scene
        if (!this.isOpened) {
            this.whiteMapMarkerCntr.setAlpha(0);
            this.mapMarkerCntr.setAlpha(0);
        }

        // ANIMATION FOR THE PHONE
        // animation only play when we first open the scene
        if (!this.isOpened) {
            const phoneChain = this.tweens.chain({
                tweens: [
                    {
                        targets: phone,
                        x: 960,
                        y: 570,
                        ease: 'power-3',
                        delay: 700,
                        duration: 1000,
                    },
                    {
                        targets: [this.mapMarkerCntr, this.whiteMapMarkerCntr],
                        alpha: 1,
                        duration: 500
                    },
                    {
                        targets: this.whiteMapMarkerCntr,
                        alpha: 0,
                        duration: 1000,
                        yoyo: true,
                        repeat: -1
                    }
                ]
            })
        }

        // Next button.
        const nextBtn = new SideButton(this, 1920 - 90, 540, 'next-arrow', this.nextBtnAudio);
        nextBtn.on('pointerdown', function () {
            this.scene.start("Scene4_6", { music: this.music });
        }, this);
        nextBtn.y = nextBtn.y - 40

        // Back button.

        const backBtn = new BackButton(this, -60, 540, 'next-arrow', this.nextBtnAudio);
        backBtn.on('pointerdown', function () {
            this.scene.start("Scene4_4", { music: this.music });
        }, this);
        backBtn.y = backBtn.y - 40

        // Save user progress.
        const save = new SaveProgress(this)
    }
}