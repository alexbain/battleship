Domsole = (function($) {
    var output;

    var init = function(outname) {
        output = $('#'+outname);
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
        output.scrollTop(9999999999);
    };

    return {
        ask: ask,
        init: init,
        write: write
    };
})(jQuery);

$(document).ready(function() {
    Domsole.init('domsole_out');
});
