import AlignGrid from './alignGrid.js'

/**
 *
 *
 * @class FormUtil
 * - Utility class to dealing with text area html DOM element
 * @param {Phaser Scene} scene - current phaser scene
 * @param {object} config - config object can contain number of cols, rows, width, height of alignGrid 
 */
export default class FormUtil {
    constructor(config) {
        //super();
        this.scene = config.scene;
        //get the game height and width
        this.gameWidth = this.scene.game.config.width;
        this.gameHeight = this.scene.game.config.height;
        this.alignGrid = new AlignGrid({
            scene: this.scene,
            rows: config.rows,
            cols: config.cols,
            height: config.height,
            width: config.width
        });
    }
    /**
     *
     *
     * @memberof FormUtil
     * - Show the matrix with index of align grid class
     */
    showNumbers() {
        this.alignGrid.showNumbers();
    }
    scaleToGameW(elName, per) {
        var el = document.getElementById(elName);
        var w = this.gameWidth * per;
        el.style.width = w + "px";
    }
    scaleToGameH(elName, per) {
        var el = document.getElementById(elName);
        var h = this.gameHeight * per;
        el.style.height = h + "px";
    }

    /**
     *
     * - Place the html DOM element at the cell with index in align grid
     * @param {float} index - index of cell
     * @param {*} elName - id name or class name of the html DOM element
     * @param {boolean} [centerX=true] - Will place at the middle or not
     * @param {boolean} [centerY=false]  - Will place at the middle or not
     * @memberof FormUtil 
     */
    placeElementAt(index, elName, centerX = true, centerY = false) {
        //get the position from the grid
        var pos = this.alignGrid.getPosByIndex(index);
        //extract to local vars
        var x = pos.x;
        var y = pos.y;
        //get the element
        var el = document.getElementById(elName);
        //set the position to absolute
        el.style.position = "absolute";
        //get the width of the element
        var w = el.style.width;
        //convert to a number
        w = this.toNum(w);
        //
        //
        //center horizontal in square if needed
        if (centerX == true) {
            x -= w / 2;
        }
        //
        //get the height
        //        
        var h = el.style.height;
        //convert to a number
        h = this.toNum(h);
        //
        //center verticaly in square if needed
        //
        if (centerY == true) {
            y -= h / 2;
        }
        //set the positions
        el.style.top = y + "px";
        el.style.left = x + "px";
    }
    //changes 100px to 100
    toNum(s) {
        s = s.replace("px", "");
        s = parseInt(s);
        return s;
    }
    //add a change callback
    addChangeCallback(elName, fun, scope = null) {
        var el = document.getElementById(elName);
        if (scope == null) {
            el.onchange = fun;
        } else {
            el.onchange = fun.bind(scope);
        }
    }
    getTextAreaValue(elName) {
        var el = document.getElementById(elName);
        return el.value;
    }
    getTextValue(elName) {
        var el = document.getElementById(elName);
        return el.innerText;
    }
    getRangeValue(elName) {
        var el = document.getElementById(elName);
        return el.value;
    }
    setRangeValue(elName, value) {
        var el = document.getElementById(elName);
        el.value = value;
        return 0;
    }
    hideElement(elName) {
        var el = document.getElementById(elName);
        el.style.display = "none";
    }
    showElement(elName) {
        var el = document.getElementById(elName);
        el.style.display = "block";
    }
}