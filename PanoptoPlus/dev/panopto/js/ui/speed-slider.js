/**
 * @file SpeedSlider, includes code that will load jQuery slider to modify the playback speed into a slider (instead of buttons) and provide larger range.
 */
let SpeedSlider = (() => {
    /**
     * SpeedSlider, includes code that will load jQuery slider to modify the playback speed into a slider (instead of buttons) and provide larger range.
     */
    class SpeedSlider {
        /**
         * Constructor is empty
         */
        constructor() {}

         /**
         * Init: initialize speed slider. First grabs slider template, then initializes.
         * @returns {undefined}
         */
        init() {
            let changePlaybackRate = function(event, ui) {
                $("video").each((index, video) => (video.playbackRate = ui.value));
                $("#playSpeedMultiplier").text(ui.value+"x");
                Settings.setNormalPlaybackRate(ui.value);
            }
            //Get template
            Template.get('speed-slider.html').then((template) => {
                //Hide all elements except the first and last element for the speed adjuster
                //WARNING: do not remove or it may cause a race condition
                //$("#playSpeedExpander").children().not(":first, :last").hide();//This has been replaced with a CSS implementation
                //Add template to after the header div
                $("#playSpeedExpander div.flyout-header").after(template);
                //Initialize Slider
                $("#speed-slider").slider({
                    min: 0.5, 
                    max: 7, 
                    value: 1, 
                    step: 0.1,
                    slide: changePlaybackRate,
                    change: changePlaybackRate,
                })
                .slider('pips', {step: 1, rest: "label", suffix: "x"})
                .slider("float");
            });
        }
    }
    return SpeedSlider;
})();