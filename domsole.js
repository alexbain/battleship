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

    var defaultHandler = function() {
        var text = response.val();
        response.val('');
        write('> ' + text);
    };

    var prompt = function(question, handler) {
        write(question);
        input.unbind('submit');
        input.submit(function() {
            var text = response.val();
            response.val('');
            write('> ' + text);
            if (typeof (handler) !== 'undefined') {
                handler(text);
            }
            input.unbind('submit');
            input.submit(defaultHandler);
        });
    };

    var write = function(text) {
        output.append(text + "\n");
        output.animate({scrollTop: output.height()}, 500);
    };

    return {
        init: init,
        prompt: prompt,
        write: write
    };
})(jQuery);

$(document).ready(function() {
    Domsole.init('domsole_out', 'domsole_in');
    Domsole.prompt("What's your name?", function(name) {
        Domsole.write("Cool. Hi, " + name);
    });
});
