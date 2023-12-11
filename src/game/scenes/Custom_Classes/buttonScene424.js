/**
 * A customizable transparent button for scene 4_24
 * @constructor
 * @param {scene} scene - The scene contain this button.
 * @param {float} x - X position of the button.
 * @param {float} y - y position of the button.
 * @param {float} width - width of the button.
 * @param {float} height - height of the button.
 * @param {float} alpha - alpha of the button
 * @param {number} radius = the round radius of button border
 */

export default class TransparentBtn extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, height, alpha, radius) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;
        if (!radius) {
            this.radius = 8
        } else {
            this.radius = radius
        }


        // Graphic.
        const btnGraphic = this.scene.add.graphics();
        btnGraphic.fillStyle(0xd7fafc, alpha)
            .fillRoundedRect(this.x, this.y, width, height, this.radius)


        // Interactivity.
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
        this.on('pointerover', function () {
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        this.on('pointerout', function () {
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "default";
        });


        this.scene.add.existing(this);
    }
}