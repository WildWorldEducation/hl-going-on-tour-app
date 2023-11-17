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
    <textarea rows="10" style="display: none;" type="text" placeholder="Type your talents here:" id="talents" />

    <!-- Check boxes, for 4th module -->
    <div style="display: none;" id="m4-checkboxes" class="checkboxes">
        <div style="margin-left: 20%;">
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
    </div>

    <!-- Text input, for the 4th module -->
    <textarea rows="10" style="display: none;" type="text" placeholder="Write down your answer here:" id="m4-notepad" />

    <!-- Text area for scene 7_10 -->
    <textarea rows='15' style="display: none;" type="text" placeholder="Type your answer here:"
        id="scene7_10-book"></textarea>
    <!-- Text area for scene 7_14 -->
    <textarea rows='20' style="display: none;" type="text" placeholder="Type your answer here:"
        id="scene7_14-book"></textarea>
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

.text-input {
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
    border: 2px dashed black;
    z-index: 2;
    top: 57%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    width: 45% !important;
    resize: none;
    text-align: center;
    font-size: medium;
    font-style: italic;
    aspect-ratio: 4.3 / 1;
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
    color: black
}

/* * Text area input for scene 7_10 * */
#scene7_10-book {
    font-family: 'Open Sans';
    z-index: 2;
    top: 17%;
    left: 58%;
    position: absolute;
    /* transform: translate(-50%, -50%); */
    width: 20.5% !important;

    border: dashed;
    border-width: 4px;
    text-align: center;
    font-size: 'medium';
    background-color: #ffffff;
}

/* remove the border that replace doted border while focus */
*:focus {
    outline: none;
}

#scene7_10-book:focus-visible {
    border: dashed;
    resize: none;
}

/* * Text area input for scene 7_10 * */
#scene7_14-book {
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


#scene7_14-book:focus-visible {

    resize: none;
}
</style>
