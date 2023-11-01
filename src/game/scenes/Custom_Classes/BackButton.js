export default class BackButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, sprite, audio) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;

        // Graphic.
        const btnGraphic = this.scene.add.graphics();
        btnGraphic.fillStyle(0x004aad, 1)
            .fillRoundedRect(0, 0, 150, 100, 32)
            .lineStyle(6, 0xffffff, 1)
            .strokeRoundedRect(0, 0, 150, 100, 32);

        // Sprite
        const btnArrow = this.scene.add.image(75, 17.5, sprite)
            .setOrigin(0.0);
        btnArrow.scale = 0.8
        btnArrow.flipX = true;

        // Add to container.
        this.add(btnGraphic);
        this.add(btnArrow);

        // Interactivity.
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, 150, 100), Phaser.Geom.Rectangle.Contains);
        this.on('pointerover', function () {
            btnGraphic.clear()
                .fillStyle(0x0060e0, 1)
                .fillRoundedRect(0, 0, 150, 100, 32)
                .lineStyle(6, 0xffffff, 1)
                .strokeRoundedRect(0, 0, 150, 100, 32);
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        this.on('pointerout', function () {
            btnGraphic.clear()
                .fillStyle(0x004aad, 1)
                .fillRoundedRect(0, 0, 150, 100, 32)
                .lineStyle(6, 0xffffff, 1)
                .strokeRoundedRect(0, 0, 150, 100, 32);
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

