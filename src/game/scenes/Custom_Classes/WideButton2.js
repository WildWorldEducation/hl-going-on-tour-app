export default class WideButton2 extends Phaser.GameObjects.Container {
    constructor(scene, x, y, text, audio) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;

        // Graphic.
        const btnGraphic = this.scene.add.graphics();
        btnGraphic.fillStyle(0x004aad, 1)
            .fillRoundedRect(0, 0, 340, 70, 8)
            .lineStyle(6, 0xffffff, 1)
            .strokeRoundedRect(0, 0, 340, 70, 8)
        // Text.
        const btnText = this.scene.add.text(170, 35, text, { fontFamily: "Arial", fontSize: "72px", fontStyle: "bold" })
            .setOrigin(0.5)
        btnText.scale = 0.5;
        // Add to container.
        this.add(btnGraphic);
        this.add(btnText);

        // Interactivity.
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, 340, 70), Phaser.Geom.Rectangle.Contains);
        this.on('pointerover', function () {
            btnGraphic.clear()
                .fillStyle(0x0060e0, 1)
                .fillRoundedRect(0, 0, 340, 70, 8)
                .lineStyle(6, 0xffffff, 2)
                .strokeRoundedRect(0, 0, 340, 70, 8);
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        this.on('pointerout', function () {
            btnGraphic.clear()
                .fillStyle(0x004aad, 1)
                .fillRoundedRect(0, 0, 340, 70, 8)
                .lineStyle(6, 0xffffff, 2)
                .strokeRoundedRect(0, 0, 340, 70, 8);
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });
        this.on('pointerdown', () => {
            audio.play()
        });

        this.scene.add.existing(this);
    }
}

