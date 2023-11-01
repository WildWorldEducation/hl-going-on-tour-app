export default class CloseButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, sprite, audio) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;

        // Graphic.
        const btnGraphic = this.scene.add.graphics();
        btnGraphic.fillStyle(0x004aad, 1)
            .fillCircle(0, 0, 50)
            .lineStyle(6, 0xffffff, 1)
            .strokeCircle(0, 0, 50);

        // Sprite
        const xMark = this.scene.add.image(0, 0, sprite)
            .setOrigin(0.5).setScale(0.7);

        // Add to container.
        this.add(btnGraphic);
        this.add(xMark);

        // Interactivity.
        this.setInteractive(new Phaser.Geom.Circle(0, 0, 50), Phaser.Geom.Circle.Contains);
        this.on('pointerover', function () {
            btnGraphic.clear()
                .fillStyle(0x0060e0, 1)
                .fillCircle(0, 0, 50)
                .lineStyle(6, 0xffffff, 1)
                .strokeCircle(0, 0, 50);
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        this.on('pointerout', function () {
            btnGraphic.clear()
                .fillStyle(0x004aad, 1)
                .fillCircle(0, 0, 50)
                .lineStyle(6, 0xffffff, 1)
                .strokeCircle(0, 0, 50);
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

