(function($) {
  $('.display-if').each(function() {
      var $this = $(this);
      var $targets = $($this.data('target_identifier'));
      var $matches = $($this.data('target_matches_identifier'));
      var targetType = $this.data('target_type');
      var displayIfAnyValue = $this.data('target_has_any_value');
      var displayIfValueIs = $this.data('target_value');
      var displayIfNotValue = $this.data('target_value_not');
      var matchValueCanBeNull = $this.data('target_value_can_be_null');

      var basicFields = ['select', 'text', 'password'];

      function matches(value) {
          var numMatches = $matches.map(function() {
            if (!matchValueCanBeNull && !$(this).val()) return false;
            return value === $(this).val();
          }).toArray().reduce(function(a, b) { return a + b; }, 0);

          return $matches.length > 0 && numMatches == $matches.length;
      }

      function basicValidator(el) {
        var $target = $(el);

        if ($matches.length > 0) return matches($target.val());
        else if (displayIfAnyValue) return !!$target.val();
        else if (displayIfNotValue) return $target.val() !== displayIfNotValue;
        return $target.val() === displayIfValueIs;
      }

      function checkboxValidator(el) {
        var $target = $(el);

        if (displayIfValueIs) return $target.is(':checked') === displayIfValueIs;
        return $target.is(':checked');
      }

      function radioValidator(el) {
        var $target = $(el);

        if (displayIfAnyValue) return $target.is(':checked');
        else if (displayIfValueIs) return $target.is(':checked') && $target.val() === displayIfValueIs;
        return $target.is(':checked') && $target.val() !== displayIfValueIs;
      }

      function defaultValidator(el) {
        var $target = $(el);
        return !!$target.val();
      }

      function updateRadioTargets() {
        $targets = $($this.data('target_identifier'));
        $targets = $targets.filter(':checked');
      }

      function showOrHide() {
          if (targetType == "radio") updateRadioTargets();

          var numChecks = $targets.map(function() {
              if (targetType === "checkbox") return checkboxValidator(this);
              else if (targetType === "radio") return radioValidator(this);
              else if (basicFields.indexOf(targetType) > -1) return basicValidator(this);
              else return defaultValidator(this);
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

      $matches.on('change', function() {
          showOrHide();
      });

      showOrHide();
  });
})(jQuery);
