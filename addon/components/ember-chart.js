import { observer } from '@ember/object';
import { merge } from '@ember/polyfills';
import { classify } from '@ember/string';
import Component from '@ember/component';
import ChartDataUpdater from 'ember-cli-chart/chart-data-updater';
/* global Chart */

export default Component.extend({
  tagName: 'canvas',
  attributeBindings: ['width', 'height'],

  didInsertElement: function(){
    var context = this.get('element').getContext('2d');
    var data = this.get('data');
    var type = classify(this.get('type'));
    var options = merge({}, this.get('options'));

    var chart = new Chart(context)[type](data, options);

    if (this.get('legend')) {
      var legend = chart.generateLegend();
      this.$().wrap("<div class='chart-parent'></div>");
      this.$().parent().append(legend);
    }

    this.set('chart', chart);
    this.addObserver('data', this, this.updateChart);
    this.addObserver('data.[]', this, this.updateChart);
    this.addObserver('options', this, this.updateChart);
  },

  willDestroyElement: function(){
    if (this.get('legend')) {
      this.$().parent().children('[class$=legend]').remove();
    }

    this.get('chart').destroy();
    this.removeObserver('data', this, this.updateChart);
    this.removeObserver('data.[]', this, this.updateChart);
    this.removeObserver('options', this, this.updateChart);
  },

  typeChanged: observer('type', function() {
    this.updateChart();
  }),

  optionsChanged: observer('options', function() {
    this.updateChart();
  }),

  updateChart: function(){
    var chart = this.get('chart');
    var data = this.get('data');
    var redraw = ChartDataUpdater.create({
      data: data,
      chart: chart
    }).updateByType();

    if (true) {
      this.willDestroyElement();
      this.didInsertElement();
    } else {
      chart.update();
    }

    if (this.get('legend')) {
      this.$().parent().children('[class$=legend]').remove();
      var legend = chart.generateLegend();
      this.$().parent().append(legend);
    }
  }
});
