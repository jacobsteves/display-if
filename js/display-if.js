(function($) {
  $('.display-if').each(function() {
      var $this = $(this);

      var targetName = $this.data('target_name')
      var targetClass = $this.data('target_class')

      var $targets = (targetName) ? $("[name='" + targetName + "']") : $("." + targetClass);
      var $matches = $("[name='" + $this.data('target_matches_identifier') + "']");

      var inverse = $this.data('display_if_inverse');
      var targetType = $this.data('target_type');

      var displayIfAnyValue = $this.data('target_has_any_value');
      var displayIfValueIs = $this.data('target_value');
      var displayIfNotValue = $this.data('target_value_not');
      var matchValueCanBeNull = $this.data('target_value_can_be_null');

      var basicFields = ['select', 'text', 'password'];

      /**
        * Determine if the the matching identifiers all have the same value as
        * @param value
        */
      function matches(value) {
          var numMatches = $matches.map(function() {
            var matchValue = $(this).val();
            if (!matchValueCanBeNull && !matchValue) return false;
            return value === matchValue;
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

      /**
        * The default validation only checks if the target has a value
        */
      function defaultValidator(el) {
        var $target = $(el);
        return !!$target.val();
      }

      /**
        * Radio inputs require multiple inputs of the same identifier. So we
        * must update the targets to only the checked value.
        */
      function updateRadioTargets() {
        $targets = $("[name='" + $this.data('target_name') + "']");
        $targets = $targets.filter(':checked');
      }

      /**
        * Check if the element passes the validation requirements to show.
        */
      function validate(el) {
        if (targetType === "checkbox") return checkboxValidator(el);
        else if (targetType === "radio") return radioValidator(el);
        else if (basicFields.indexOf(targetType) > -1) return basicValidator(el);
        return defaultValidator(el);
      }

      /**
        * Check all targets and determine if the object passes the display_if
        * requirement. If there are multiple targets (meaning there are multiple)
        * elements with the same target identifier) then the object must passes
        * the display requirement on each target.
        */
      function showOrHide() {
          if (targetType == "radio") updateRadioTargets();

          var numChecks = $targets.map(function() {
              var validated = validate(this);
              return (inverse) ? !validated : validated;
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
