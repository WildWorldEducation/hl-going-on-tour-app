/**
 * A customizable button with a exclamation icon
 * @constructor
 * @param {scene} scene - The scene contain this button.
 * @param {float} x - X position of the button.
 * @param {float} y - y position of the button.
 * @param {string} sprite - the sprite name of the exclamation icon
 * @param {number} diameter = diameter of the fill circle graphic
 * 
 * 
 */

export default class ExclamationBtn extends Phaser.GameObjects.Container {
    constructor(scene, x, y, sprite, diameter) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;

        if (!diameter) {
            diameter = 50;
        }

        // Graphic.
        const btnGraphic = this.scene.add.graphics();
        btnGraphic.fillStyle(0x004aad, 1)
            .fillCircle(0, 0, diameter)
            .lineStyle(6, 0xffffff, 1)
            .strokeCircle(0, 0, diameter);

        // Sprite
        const exclamation = this.scene.add.image(0, 0, sprite)
            .setOrigin(0.5).setScale(1.1);

        // Add to container.
        this.add(btnGraphic);
        this.add(exclamation);

        // Interactivity.
        this.setInteractive(new Phaser.Geom.Circle(0, 0, diameter), Phaser.Geom.Circle.Contains);
        this.on('pointerover', function () {
            btnGraphic.clear()
                .fillStyle(0x0060e0, 1)
                .fillCircle(0, 0, diameter)
                .lineStyle(6, 0xffffff, 1)
                .strokeCircle(0, 0, diameter);
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        this.on('pointerout', function () {
            btnGraphic.clear()
                .fillStyle(0x004aad, 1)
                .fillCircle(0, 0, diameter)
                .lineStyle(6, 0xffffff, 1)
                .strokeCircle(0, 0, diameter);
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });
        this.scene.add.existing(this);
    }
}

