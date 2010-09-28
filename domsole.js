Domsole = (function($) {
    var output;
    var input;
    var response;

    var init = function(outname, inname) {
        output = $('#'+outname);
        input = $('#'+inname);
        response = input.find('input');

        output.attr('disabled', 'disabled');
    };

    var ask = function(question) {
        write(question);
        var text = prompt(question);
        write('> ' + text);
        return text;
    };

    var write = function(text) {
        output.append(text + "\n");
        output.animate({scrollTop: output.height()}, 500);
    };

    return {
        ask: ask,
        init: init,
        write: write
    };
})(jQuery);

$(document).ready(function() {
    Domsole.init('domsole_out', 'domsole_in');
});
