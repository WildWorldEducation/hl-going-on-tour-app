<script setup>
import PhaserContainer from '../components/PhaserContainer.vue'
</script>

<template>
    <Suspense>
        <PhaserContainer />

        <template #fallback>
            <div class="placeholder">
                Downloading ...
            </div>
        </template>
    </Suspense>

    <div style="font-family:'Open Sans'; position:absolute; left:-1000px; visibility:hidden;">.</div>

    <!-- Text input, for the first module -->
    <input style="display: none;" type="text" placeholder="Type your first name here" id="student-name"
        class="text-input" />


    <!-- Text input, for the 4th module -->
    <div id="talents" class="text-input" style="display: none;">
        <p>What are some of your talents? <strong>Write down one of your
                talents and explain how this is a talent.</strong> Example - I am a
            talented musician because I can sing and play the guitar.</p>
        <textarea rows="10" type="text" placeholder="Type your talents here:" />
    </div>

    <!-- Check boxes, for 4th module -->
    <div style="display: none;" id="m4-checkboxes" class="checkboxes">
        <p class="form-check mb-2">
            <input class="form-check-input" type="checkbox" value="" id="m4-checkbox-1">
            <label class="form-check-label" for="defaultCheck1">
                Pens can malfunction and actually burst
            </label>
        </p>
        <p class="form-check mb-2">
            <input class="form-check-input" type="checkbox" value="" id="m4-checkbox-2">
            <label class="form-check-label" for="defaultCheck1">
                They have chemical fluids in them
            </label>
        </p>
        <p class="form-check mb-2">
            <input class="form-check-input" type="checkbox" value="" id="m4-checkbox-3">
            <label class="form-check-label" for="defaultCheck1">
                The vape pen could have weed or fentanyl in it
            </label>
        </p>
        <p class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="m4-checkbox-4">
            <label class="form-check-label" for="defaultCheck1">
                Even vaping produces harmful second hand health issues
            </label>
        </p>
    </div>

    <!-- Text input, for the 4th module -->
    <textarea rows="10" style="display: none;" type="text" placeholder="Write down your answer here:" id="m4-notepad" />

    <!-- ********************** Range Input For Scene 4_22 ***************************** -->
    <div id="scene4_22-range-input" class="range-illness-stages" style="display: none;">
        <input type="range" id="lung-popcorn-stage" name="lung-popcorn-stage" step="20" min="0" max="40" value="0" />
        <br />
    </div>


    <!-- Text input, for the 5th module -->
    <textarea rows="10" style="display: none;" type="text" placeholder="Type your answer here:" id="m5-notepad"></textarea>

    <!-- Text area for scene 7_10 -->
    <textarea rows='15' style="display: none;" type="text" placeholder="Type your answer here:"
        id="scene7_10-book"></textarea>

    <!-- Text area for scene 7_14 -->
    <textarea rows='20' style="display: none;" type="text" placeholder="Type your answer here:"
        id="scene7_14-book"></textarea>

    <!-- Text area for scene 7_16_C2 -->
    <textarea rows='20' style="display: none;" type="text" placeholder="Type your answer here:"
        id="scene7_16_C2-book"></textarea>

    <!-- Text area for scene 7_18 -->
    <textarea rows='20' style="display: none;" type="text" placeholder="Type your answer here:"
        id="scene7_18-book"></textarea>

    <!-- Scene 7_21 range input  -->
    <div id="scene7_21-range-input" class="rangeTimeDiv" style="display: none;">
        <datalist class="minute-mark">
            <option value="0" class="startMinute">0</option>
            <option value="15" label="15">15</option>
            <option value="30" label="30">30</option>
            <option value="45" label="45">45</option>
            <option value="60" label="60">60</option>
            <option value="75" label="75">75</option>
            <option value="90" id="endMinute" label="90">90</option>
        </datalist>
        <input type="range" id="timeSpend" name="time-spend" list="markers" step="15" min="0" max="90" value="0" />
    </div>
    <!-- Scene 7_22 range input (use separate input for each scene for easier save management) -->
    <div id="scene7_22-range-input" class="rangeTimeDiv" style="display: none;">
        <datalist class="minute-mark">
            <option value="0" class="startMinute">0</option>
            <option value="15" label="15">15</option>
            <option value="30" label="30">30</option>
            <option value="45" label="45">45</option>
            <option value="60" label="60">60</option>
            <option value="75" label="75">75</option>
            <option value="90" id="endMinute" label="90">90</option>
        </datalist>
        <input type="range" id="timeSpend-22" name="time-spend-22" list="markers" step="15" min="0" max="90" value="0" />
    </div>
    <!-- Scene 7_23 range input -->
    <div id="scene7_23-range-input" class="rangeTimeDiv" style="display: none;">
        <datalist class="minute-mark" id="s7_23-range-label">
            <option value="0" class="startMinute" id="s7_23-start-minute">0</option>
            <option value="15" label="15">15</option>
            <option value="30" id="s7_23-30m" label="30">30</option>
            <option value="45" id="s7_23-45m" label="45">45</option>
            <option value="60" id="s7_23-60m" label="60">60</option>
            <option value="75" label="75">75</option>
            <option value="90" id="s7_23-90m" label="90">90</option>
            <option value="90+" id="s7_23-end-minute " label="90+">90+</option>
        </datalist>
        <input type="range" id="timeSpend-23" name="time-spend-22" list="markers" step="15" min="0" max="105" value="0" />
    </div>

    <!-- text area for scene 8_3  -->
    <textarea rows='20' style="display: none;" type="text" placeholder="Type your answer here:" id="scene8_3-book"
        class="book-textarea"></textarea>
    <!-- text area for scene 8_7  -->
    <textarea rows='20' class="book-textarea" style="display: none;" type="text" placeholder="Type your answer here:"
        id="scene8_7-book"></textarea>
</template>

<style scoped>
.placeholder {
    font-size: 2rem;
    font-family: 'Courier New', Courier, monospace;
}

/* The student name text input field */
@font-face {
    font-family: 'kristen-itc';
    src: url('/assets/Fonts/kristen_itc_normal.woff2') format('woff2'),
        /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
        url('/assets/Fonts/kristen_itc_normal.ttf') format('truetype');
    /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
}

#student-name {
    z-index: 2;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    font-family: 'kristen-itc';
    border: none;
    text-align: center;
    background: transparent;
}

@media only screen and (min-width: 701px) {
    .text-input {
        font-size: 2em;
    }

    .checkboxes {
        font-size: 1.2em;
    }
}

@media only screen and (min-width: 901px) {
    .text-input {
        font-size: 2em;
    }

    .checkboxes {
        font-size: 1.5em;
    }
}

@media only screen and (max-width: 700px) {
    .text-input {
        font-size: 1em;
    }

    .checkboxes {
        font-size: 0.8em;
    }
}

#m4-checkboxes .form-check-input[type=checkbox] {
    border-color: black;
}

.text-input:focus-visible {
    outline: none;
    background: transparent;
}

::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: black;
    opacity: 1;
}

/* Firefox */
:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: black;
}

::-ms-input-placeholder {
    /* Microsoft Edge */
    color: black;
}

/* Text input from Module 4: NYC */
#talents {
    font-family: 'Open Sans', sans-serif;
    z-index: 2;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    width: 50% !important;
    resize: none;
    text-align: center;
    font-size: larger;
    color: black;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 25px;
}

#talents textarea {
    border: 3.5px dashed black;
    font-style: italic;
    background-color: rgb(255, 255, 255, 0.2);
    aspect-ratio: 4.3 / 1;
    width: 100%;
    text-align: center;
}


/* Check boxes from Module 4: NYC */
.checkboxes {
    z-index: 2;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    border: none;
    background: transparent;
    font-family: 'Open Sans';
    color: black;
    font-size: larger;
    color: black;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 25px;
    width: 50%;
}

/* Text input from Module 4: NYC */
#m4-notepad {
    font-family: 'Open Sans';
    z-index: 2;
    top: 57%;
    left: 50%;
    position: absolute;
    transform: translate(-45%, -70%);
    width: 25% !important;
    resize: none;
    border: none;
    text-align: center;
    font-size: medium;
    font-style: italic;
    background-color: #ffdea0;
}

#m4-notepad:focus-visible {
    border: none;
}

/* ----------------------------------------------------------------------------------------------------- */
/****** RANGE INPUT IN LEVEL 4 *******/
/* -- */
.range-illness-stages {
    position: absolute;
    top: 77%;
    left: 62%;
    z-index: 2;
    width: 22% !important;
    background: #959fe4;
}

/*=*/
.range-illness-stages input[type=range] {
    -webkit-appearance: none;
    margin: 10px 0;
    width: 100%;
    background: transparent;
}

.range-illness-stages input[type=range]:focus {
    outline: none;
}

.range-illness-stages input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 38px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #ffffff;
    border-radius: 50px;
    border: 5.5px solid #004bfe;
}

.range-illness-stages input[type=range]::-webkit-slider-thumb {
    box-shadow: 0px 0px 1px #000fce;
    border: 5px solid #ffffff;
    height: 60px;
    width: 60px;
    border-radius: 50px;
    background: #1b75b3;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -13.5px;
    box-shadow: 1px 1px 1px 1px #000000;
}

.range-illness-stages input[type=range]:focus::-webkit-slider-runnable-track {
    background: #ffffff;
}

.range-illness-stages input[type=range]::-moz-range-track {
    width: 100%;
    height: 32px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #959fe4;
    border-radius: 50px;
    border: 4px solid #004bfe;
}

.range-illness-stages input[type=range]::-moz-range-thumb {
    box-shadow: 0px 0px 1px #000fce;
    border: 5px solid #ffffff;
    height: 50px;
    width: 50px;
    border-radius: 50px;
    background: transparent;
    cursor: pointer;
}

.range-illness-stages input[type=range]::-ms-track {
    width: 100%;
    height: 32px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
}

.range-illness-stages input[type=range]::-ms-fill-lower {
    background: #ffffff;
    border: 4px solid #004bfe;
    border-radius: 100px;
    box-shadow: 0px 0px 0px #000000;
}

.range-illness-stages input[type=range]::-ms-fill-upper {
    background: #ffffff;
    border: 4px solid #004bfe;
    border-radius: 100px;
    box-shadow: 0px 0px 0px #000000;
}

.range-illness-stages input[type=range]::-ms-thumb {
    box-shadow: 0px 0px 1px #000fce;
    border: 5px solid #ffffff;
    height: 50px;
    width: 50px;
    border-radius: 50px;
    background: #1b75b3;
    cursor: pointer;
}

.range-illness-stages input[type=range]:focus::-ms-fill-lower {
    background: #ffffff;
}

.range-illness-stages input[type=range]:focus::-ms-fill-upper {
    background: #ffffff;
}

/****** END OF RANGE INPUT IN LEVEL 4 *******/

/* Text input from module 5: Chicago */
#m5-notepad {
    font-family: 'Open Sans';
    z-index: 2;
    top: 57%;
    left: 50%;
    position: absolute;
    transform: translate(7.5%, -60%);
    width: 35% !important;
    height: 70%;
    resize: none;
    border: dashed !important;
    text-align: center;
    font-size: medium;
    font-style: italic;
    background: rgba(0, 0, 0, 0);
}

#m5-notepad:focus {
    outline: none;
}

/* * Text area input for scene 7_10 * */
#scene7_10-book {
    font-family: 'Open Sans';
    z-index: 2;
    top: 23%;
    left: 61%;
    position: absolute;
    /* transform: translate(-50%, -50%); */
    width: 15% !important;
    height: 40%;
    border: none;
    border-width: 4px;
    text-align: center;
    font-size: large;
    background-color: transparent;
}

/* remove the border that replace doted border while focus */
*:focus {
    outline: none;
}

#scene7_10-book:focus-visible {
    resize: none;
}

/* * Text area input for scene 7_10 * */
#scene7_14-book {
    font-family: 'Open Sans';
    z-index: 2;
    top: 15%;
    left: 55.5%;
    position: absolute;
    /* transform: translate(-50%, -50%); */
    width: 25% !important;
    height: 40% !important;
    border: none;
    border-width: 4px;
    text-align: center;
    font-size: large;
    background-color: transparent;
}

#scene7_14-book:focus-visible {
    resize: none;
}

/* * Text area input for scene 7_16_C2 * */
#scene7_16_C2-book {
    font-family: 'Open Sans';
    z-index: 2;
    top: 15%;
    left: 55.5%;
    position: absolute;
    /* transform: translate(-50%, -50%); */
    width: 25% !important;
    height: 40% !important;
    border: none;
    border-width: 4px;
    text-align: center;
    font-size: large;
    background-color: transparent;

}

#scene7_16_C2-book:focus-visible {
    resize: none;
}

/* -- */
/* * Text area input for scene 7_16_C2 * */
#scene7_18-book {
    font-family: 'Open Sans';
    z-index: 2;
    top: 15%;
    left: 55.5%;
    position: absolute;
    /* transform: translate(-50%, -50%); */
    width: 25% !important;
    height: 40% !important;
    border: none;
    border-width: 4px;
    text-align: center;
    font-size: large;
    background-color: transparent;
}

#scene7_18-book:focus-visible {
    resize: none;
}

/* ---------------------------------------------------------------------------------------------- */
/* css for range input div */
.rangeTimeDiv {
    position: absolute;
    top: 76%;
    left: 50%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    width: 50% !important;
}

.minute-mark {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 75%;
    font-weight: 900;
    font-style: bold;
    font-family: Arial;
    font-size: 24px;
}

.minute-mark option {
    font-style: bold;
    font-weight: 700;
}

.rangeTimeDiv>input[type=range] {
    height: 33px;
    -webkit-appearance: none;
    margin: 10px 0;
    width: 75%;
    border-radius: 33px;
}

.rangeTimeDiv>input[type=range]:focus {
    outline: none;
}

.rangeTimeDiv>input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 33px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #FFFFFF;
    border-radius: 33px;
    border: 4.5px solid #004aad;
}

.rangeTimeDiv>input[type=range]::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000;
    border: 5px solid #FFFDF0;
    height: 45px;
    width: 45px;
    border-radius: 50px;
    background: #004aad;
    cursor: pointer;
    -webkit-appearance: none;
    margin-bottom: 1px;
    margin-top: -10px;
}

.rangeTimeDiv>input[type=range]:focus::-webkit-slider-runnable-track {
    background: #FFFFFF;
}

.rangeTimeDiv>input[type=range]::-moz-range-track {
    width: 100%;
    height: 33px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #FFFFFF;
    border-radius: 33px;
    border: 3px solid #004aad;
}

.rangeTimeDiv>input[type=range]::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000;
    border: 3.5px solid #FFFDF0;
    height: 50px;
    width: 50px;
    border-radius: 50px;
    background: #004aad;
    cursor: pointer;
    margin-bottom: 15px;
}

.rangeTimeDiv>input[type=range]::-ms-track {
    width: 100%;
    height: 33px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
}

.rangeTimeDiv>input[type=range]::-ms-fill-lower {
    background: #FFFFFF;
    border: 3px solid #2B00FF;
    border-radius: 66px;
    box-shadow: 0px 0px 0px #000000;
}

.rangeTimeDiv>input[type=range]::-ms-fill-upper {
    background: #FFFFFF;
    border: 3px solid #2B00FF;
    border-radius: 66px;
    box-shadow: 0px 0px 0px #000000;
}

.rangeTimeDiv>input[type=range]::-ms-thumb {
    margin-top: 1px;
    box-shadow: 1px 1px 1px #000000;
    border: 3.5px solid #FFFDF0;
    height: 50px;
    width: 50px;
    border-radius: 50px;
    background: #004aad;
    cursor: pointer;
    margin-bottom: 15px;
}

.rangeTimeDiv>input[type=range]:focus::-ms-fill-lower {
    background: #FFFFFF;
}

.rangeTimeDiv>input[type=range]:focus::-ms-fill-upper {
    background: #FFFFFF;
}

/* ---------------------------------------------------------------------------------------------- */
/* Tan comment - Due to the defaults css for option it will not align well with the value
    So we have to manual resizing margin of some option for a better match
*/
#scene7_23-range-input {
    width: 55% !important;
    left: 45%;
}

#scene7_23-range-input .minute-mark {
    font-size: 20px;
    width: 80%;
}

#scene7_23-range-input #timeSpend-23 {
    width: 80%;
}

/* California */
/* -- */
/* * Text area input for scene8_3 * */
#scene8_3-book {
    font-family: 'Open Sans';
    z-index: 2;
    top: 7%;
    left: 53.5%;
    position: absolute;
    /* transform: translate(-50%, -50%); */
    width: 31% !important;
    height: 84% !important;
    border: dashed;
    border-width: 4px;

    text-align: center;
    font-size: 'medium';
    background-color: #fcf8eb;
}

#scene8_3-book:focus-visible {
    resize: none;
}


/* -- */
/* * Text area input for scene8_7 * */
#scene8_7-book {
    font-family: 'Open Sans';
    z-index: 2;
    top: 7%;
    left: 53.5%;
    position: absolute;
    /* transform: translate(-50%, -50%); */
    width: 31% !important;
    height: 84% !important;
    border: dashed;
    border-width: 4px;
    text-align: center;
    font-size: 'medium';
    background-color: #fcf8eb;
}

#scene8_7-book:focus-visible {
    resize: none;
}

textarea[class^="book-textarea"]::placeholder {
    font-size: 2.5rem !important;
}

/* */

/* ---------------------------------------------------------------------------------------------- */
</style>
