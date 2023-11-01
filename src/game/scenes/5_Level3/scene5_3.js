export default class Scene5_3 extends Phaser.Scene {
    constructor() {
        super('Scene5_3');
    }
    preload() {
        // Audio.
        this.load.audio("next-button", ["assets/Audio/SFX/General/next-button.mp3"]);

        // Video.
        this.load.video('vid5-2', 'assets/Videos/5_Level3/scene5-vid2.mp4');
    }

    create() {
        // Video.
        const vid = this.add.video(0, 0, 'vid5-2');
        vid.setOrigin(0)
        vid.scale = 0.5
        vid.play();

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
            this.scene.start("Scene5_4");
        }, this);
    }
}