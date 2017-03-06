(function ($) {
    'use strict';

    var themeColorList = {
        '#color-1': 45,
        '#color-2': 40,
        '#color-3': 35,
        '#color-4': 30,
        '#color-5': 20,
        '#color-6': 10,
        '#color-7': 0,
        '#color-8': -10,
        '#color-9': -20,
        '#color-10': -30,
        '#color-11': -40
    };

    var baseHue = 0;
    var baseSat = 30;
    var baseLight = 50;
    var HSL;
    var target;
    var newColor;
    var generatedColor;
    var generatedColorLightness;

    var generatedColorPalette = '';

    var makeColors = function(color) {
        //Start with RGB values
        var baseRed = ( hexToRgb(color).r );
        var baseGreen = ( hexToRgb(color).g );
        var baseBlue = ( hexToRgb(color).b );

        // Convert to HSL format to be able to perform lightness calculations
        HSL = rgbToHsl(baseRed, baseGreen, baseBlue);
        baseHue = HSL[0];
        baseSat = HSL[1] * 100;
        baseLight = HSL[2] * 100;

        // Create the lighter/darker values
        $.each( themeColorList, function( themeColor, themelightness ) {
            var generatedColorLightness = baseLight + themelightness;

            if (generatedColorLightness < 0) {
                generatedColorLightness = 0;
            } else if (generatedColorLightness > 100) {
                generatedColorLightness = 100;
            } 
           
            target = themeColor.replace('color-', '');

            generatedColor = 'hsl(' + baseHue + ', ' + baseSat + '%, ' + generatedColorLightness + '%)';
            var generatedColorAsRGB = colorsys.hsl_to_rgb(baseHue, baseSat, generatedColorLightness);
            var generatedColorAsHex = hsl_to_hex(baseHue, baseSat, generatedColorLightness);
            

            $(target).css('background', generatedColor).find('.hex').css('background', 'white').css('opacity', '0.8').html(generatedColorAsHex);

        });
    }
    
    $(document).ready( function(e)
    {
        $('.js-palette li').append('<div class=\'hex\'></div>');

        var cp = $('.colorpicker').wheelColorPicker({ cssClass: 'cp', format: 'hex', layout: 'block', preview: 'false', sliders: 'hwsv' });
        $(cp).wheelColorPicker('setValue', '#807d73');
        makeColors('#807d73');
        $(cp).wheelColorPicker( 'redrawSliders');
        $(cp).on('slidermove', function() {
            makeColors($(this).val());
        });
        $(cp).on('change', function() {
            makeColors($(this).val());
        });

        $('.js-download-colors').on('click', function(){
            generatedColorPalette = '';
            $('.palette li').each(function() {
                generatedColorPalette += $(this).find('.hex').html() + '\n';
            });
            download(generatedColorPalette, 'color-palette.css', 'text/plain');
        });
    });
}(window.jQuery));
