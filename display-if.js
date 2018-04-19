var DisplayIf = function(opts) {

  var init = function() {
    window.onload = function() {
        if (window.jQuery) {
            // jQuery is loaded
            initializeDisplayIf();
        } else {
            // jQuery is not loaded
            console.warn("jQuery has not been loaded into your project.");
        }
    }
  };

  var initializeDisplayIf = function() {
    $('.display-if-selected-option').each(function() {
        var $targetEl = $(this);
        var $questionEl = $($targetEl.data('if_selected_option'));
        var displayIfValueIs = $targetEl.data('selected_value');
        var displayIfNotValue = $targetEl.data('selected_value_not');

        function showOrHide() {
            var numChecks = $questionEl.map(function() {
                var $thisQuestionEl = $(this);

                if (displayIfNotValue) {
                    return $thisQuestionEl.val() !== displayIfNotValue;
                } else {
                    return $thisQuestionEl.val() === displayIfValueIs;
                }
            }).toArray().reduce(function(a, b) { return a + b; }, 0);

            if ($questionEl.length > 0 && numChecks == $questionEl.length) {
                $targetEl.show();
            } else {
                $targetEl.hide();
            }

        }

        $questionEl.on('change', function() {
            showOrHide();
        });

        showOrHide();
    });
  };

}
