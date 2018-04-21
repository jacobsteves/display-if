(function($) {
  $('.display-if').each(function() {
      var $this = $(this);
      var $targets = $($this.data('target_identifier'));
      var targetType = $this.data('target_type');
      var displayIfValueIs = $this.data('target_value');
      var displayIfNotValue = $this.data('target_value_not');

      function selectValidator(el) {
        var $target = $(el);

        if (displayIfNotValue) {
            return $target.val() !== displayIfNotValue;
        } else {
            return $target.val() === displayIfValueIs;
        }
      }

      function checkboxValidator(el) {
        var $target = $(el);

        if (displayIfValueIs) {
            return $target.is(':checked') === displayIfValueIs;
        } else {
            return $target.is(':checked');
        }
      }

      function showOrHide() {
          var numChecks = $targets.map(function() {
              if (targetType === "select") return selectValidator(this);
              else if (targetType === "checkbox") return checkboxValidator(this);
          }).toArray().reduce(function(a, b) { return a + b; }, 0);

          if ($targets.length > 0 && numChecks == $targets.length) {
              $this.show();
          } else {
              $this.hide();
          }

      }

      $targets.on('change', function() {
          showOrHide();
      });

      showOrHide();
  });
})(jQuery);
