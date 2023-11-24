
export default class ButtonWithArrow extends Phaser.GameObjects.Container {
    /**
 * Creates an instance of Button With Arrow and have no border.
 * @param {*} scene - current scene
 * @param {*} x - x position
 * @param {*} y - y position
 * @param {*} sprite - arrow sprite
 * @param {*} audio - sound when button is clicked
 * @param {*} type - 'next' | 'back' : determine the direction of arrow sprite
 * @param {*} width - width of button
 * @param {*} height - height of button
 * @param {*} arrowOffsetX - offset X of arrow ( need to manual set to make arrow in the center of button)
 * @param {*} arrowOffsetY - offset Y of arrow ( need to manual set to make arrow in the center of button)
 * @param {*} spriteScale - scale value of the arrow sprite
 * @memberof ButtonWithArrow
 */
    constructor(scene, x, y, width, height, sprite, audio, type, arrowOffsetX, arrowOffsetY, spriteScale) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;


        // Graphic.
        const btnGraphic = this.scene.add.graphics();
        btnGraphic.fillStyle(0x004aad, 1)
            .fillRect(0, 0, width, height, 32)
        // .lineStyle(6, 0xffffff, 1)
        // .strokeRoundedRect(0, 0, 150, 100, 32);

        // Sprite
        const btnArrow = this.scene.add.image(0, 0, sprite)
            .setOrigin(arrowOffsetX ? arrowOffsetX : 0, arrowOffsetY ? arrowOffsetY : 0);
        btnArrow.scale = (spriteScale ? spriteScale : 0.45);
        if (type === 'next') {
            btnArrow.flipX = false;
        }
        if (type === 'back') {
            btnArrow.flipX = true;
        }

        // Add to container.
        this.add(btnGraphic);
        this.add(btnArrow);

        // Interactivity.
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
        this.on('pointerover', function () {
            btnGraphic.clear()
                .fillStyle(0x0060e0, 1)
                .fillRect(0, 0, width, height, 32)
            // .lineStyle(6, 0xffffff, 1)
            // .strokeRoundedRect(0, 0, 150, 100, 32);
            // Change mouse cursor.
            this.canvas = document.getElementsByTagName("canvas")[0];
            this.canvas.style.cursor = "pointer";
        });
        this.on('pointerout', function () {
            btnGraphic.clear()
                .fillStyle(0x004aad, 1)
                .fillRect(0, 0, width, height, 32)
            // .lineStyle(6, 0xffffff, 1)
            // .strokeRoundedRect(0, 0, 150, 100, 32);
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