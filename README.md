# Display If
A super light & simple jQuery module that displays or hides specified elements based on data.

## Requirements
- <b>jQuery:</b> version 1.11.1 or higher.

## Installation
- Download `js/display-if.js` or `js/display-if.min.js`.
- Import it into your project and you're good to go
- To be available on Bower/NPM shortly

## Usage
1. Name your input/form field. For example:
```html
<input type="text" name="displayIfText" />
```

2. Add data fields to the tag that you want to hide or show depending on the input value. For example:

```html
<div class="form-text text-muted display-if"
     data-target_name="displayIfText"
     data-target_type="text"
     data-target_value="debug">
     <small>Debug mode: active!</small>
</div>
```
- In this example, when `input[name=displayIfText]` has a value of `debug`, the div above will be visible.

#### Data Options
To add an option to your display-if element, use the html5 data- tags. 
For example, if your option is named `option` add a `data-option='...'` tag to your element.

| Option             | Description |
| ------------------ | ----------- |
| target_name               | The name of the form field that the display element depends on. |
| target_matches_identifier | The name of another form field. If this option is given, then the system will check if `[name=data_target_name]` has the same value as `[name=data_target_matches_identifier]` |
| target_type        | <b>Default:</b> 'default'. <br><b>Options:</b> 'text', 'select', 'password', 'radio', 'checkbox', 'default' <br><br>The type of input. |
| display_if_inverse | <b>Default:</b> false. <br><br>If true, the display requirements will show the element if the negation of the display_if is satisfied |
| target_value       | The value that satisfies the display requirement. If the form field value is equal to the target_value, then the display requirement is satisfied. |
| target_value_not   | The value that breaks the display requirement. If the form field value is equal to the target_value, then the display requirement is not satisfied. This is an alias for setting the `target_value` and `displsy_if_inverse=true` |
| target_value_can_be_null   | <b>Default:</b> false. <br><br>If true, then the target_value could match with matches_identifiers if both values are null. If false, then each target and match must have some value so satisfy the display requirement. |

## Demo
Click [here](http://jacobsteves.ca/jquery-display-if) for a live demo.
![Demo Gif](demo/images/displayIf.gif)
