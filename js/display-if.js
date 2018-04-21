(function($) {
  $('.display-if').each(function() {
      var $this = $(this);
      var $targets = $($this.data('target_identifier'));
      var targetType = $this.data('target_type');
      var displayIfAnyValue = $this.data('target_has_any_value');
      var displayIfValueIs = $this.data('target_value');
      var displayIfNotValue = $this.data('target_value_not');

      function selectValidator(el) {
        var $target = $(el);

        if (displayIfAnyValue) {
            return !!$target.val();
        } else if (displayIfNotValue) {
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

      function radioValidator(el) {
        var $target = $(el);

        if (displayIfAnyValue) {
            return $target.is(':checked');
        } else if (displayIfValueIs) {
            return $target.is(':checked') && $target.val() === displayIfValueIs;
        } else {
            return $target.is(':checked') && $target.val() !== displayIfValueIs;
        }
      }

      function updateRadioTargets() {
        $targets = $($this.data('target_identifier'));
        $targets = $targets.filter(':checked');
      }

      function showOrHide() {
          if (targetType == "radio") updateRadioTargets();

          var numChecks = $targets.map(function() {
              if (targetType === "select") return selectValidator(this);
              else if (targetType === "checkbox") return checkboxValidator(this);
              else if (targetType == "radio") return radioValidator(this);
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
