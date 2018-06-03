<<<<<<< HEAD
# Ember Chart

[![Build Status](https://travis-ci.org/aomra015/ember-cli-chart.svg)](https://travis-ci.org/aomra015/ember-cli-chart)

This is an Ember CLI addon for adding a [ChartJS](http://www.chartjs.org/) component. This addon is tested on Ember-CLI v1.13.1 and uses the `ember-try` addon to test against Ember release, beta and canary.

### Installation

```
$ ember install ember-cli-chart
```

### Usage

In your handlebars template just do:

```
{{ember-chart type=CHARTTYPE data=CHARTDATA options=CHARTOPTIONS width=CHARTWIDTH height=CHARTHEIGHT legend=LEGEND}}
```

* CHARTTYPE: String; one of the following -- `Line`, `Bar`, `Radar`, `PolarArea`, `Pie` or `Doughnut`.
* CHARTDATA: Array; refer to the ChartJS documentation
* CHARTOPTIONS: Object; refer to the ChartJS documentation. This is optional.
* CHARTWIDTH: Number; pixel width of the canvas element
* CHARTHEIGHT: Number; pixel height of the canvas element
* LEGEND: Boolean, true means add a legend. This is optional.

#### Example

```
{{ember-chart type='Pie' data=model.chartData width=200 height=200}}
```

#### Example with Legend

```
{{ember-chart type='Line' data=model.chartData width=200 height=200 legend=true}}
```

#### More Resources

* [Screencast on creating bar charts with ember-cli-chart](https://www.emberscreencasts.com/posts/46-bar-charts-with-ember-cli-chart)

=======
my-addon
==============================================================================

[Short description of the addon.]

Installation
------------------------------------------------------------------------------

```
ember install my-addon
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd my-addon`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
>>>>>>> 9b37d95... message
