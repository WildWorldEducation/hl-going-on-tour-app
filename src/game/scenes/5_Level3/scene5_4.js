export default class Scene5_4 extends Phaser.Scene {
    constructor() {
        super('Scene5_4');
    }
    preload() {
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);

        // Sprites.
        this.load.image('wood-bg', 'assets/Images/5_Level3/letter-scene/wood-bg.png');
        this.load.image('envelope', 'assets/Images/5_Level3/letter-scene/envelope.png');
    }

    create() {
        // City bg.
        var cityBG = this.add.sprite(0, 0, 'wood-bg').setOrigin(0);
        cityBG.setScale(0.685)

        // Envelope.
        var envelope = this.add.sprite(0, 0, 'envelope').setOrigin(0.5);
        envelope.x = this.cameras.main.width / 2
        envelope.y = this.cameras.main.height / 2 + 50
        envelope.setScale(0.6)

        // Next button.
        this.nextBtnAudio = this.sound.add("next-button", { loop: false });
        var nextBtnGraphic = this.add.graphics();
        nextBtnGraphic.fillStyle(0x004aad, 1);
        nextBtnGraphic.fillRoundedRect(0, 0, 50, 50, 8);
        var nextBtnText = this.add.text(0, 0, ">", { fontFamily: "Arial", fontSize: "18px" });
        nextBtnText.setOrigin(0.5, 0.5)
        var nextBtn = this.add.container(0, 0, [nextBtnGraphic, nextBtnText]);
        //  Right align.
        Phaser.Display.Align.In.RightCenter(nextBtn, this.add.zone(430, 245, 960, 540));
        nextBtn.setInteractive(new Phaser.Geom.Rectangle(0, 0, 50, 50), Phaser.Geom.Rectangle.Contains);
        nextBtn.on('pointerover', function () {
            nextBtnGraphic.clear()
            nextBtnGraphic.fillStyle(0x5e94db, 1);
            nextBtnGraphic.fillRoundedRect(0, 0, 50, 50, 8);
        });
        nextBtn.on('pointerout', function () {
            nextBtnGraphic.clear()
            nextBtnGraphic.fillStyle(0x004aad, 1);
            nextBtnGraphic.fillRoundedRect(0, 0, 50, 50, 8);
        });
        nextBtn.on('pointerdown', function () {
            this.nextBtnAudio.play();
            this.scene.start("Scene5_2");
        }, this);
    }
}