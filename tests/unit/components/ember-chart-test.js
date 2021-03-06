import { A } from '@ember/array';
import EmberObject, { computed } from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('EmberChartComponent', function(hooks) {
  setupTest(hooks);

  // Test Data
  var ChartTestData = EmberObject.extend({
    pieValue1: 300,
    pieValue2: 50,
    pieValue3: 100,
    pieData: computed('pieValue1', 'pieValue2', 'pieValue3', function(){
      return [
        {
          value: parseInt(this.get('pieValue1')),
          color:"#F7464A",
          highlight: "#FF5A5E",
          label: "Red"
        },
        {
          value: parseInt(this.get('pieValue2')),
          color: "#46BFBD",
          highlight: "#5AD3D1",
          label: "Green"
        },
        {
          value: parseInt(this.get('pieValue3')),
          color: "#FDB45C",
          highlight: "#FFC870",
          label: "Yellow"
        }
      ];
    }),

    pieData2: computed(function(){
      return [
        {
          value: 20,
          color: "#000000",
          highlight: "#000000",
          label: "Black"
        },
        {
          value: 310,
          color:"#F7464A",
          highlight: "#FF5A5E",
          label: "Red"
        },
        {
          value: 101,
          color: "#FDB45C",
          highlight: "#FFC870",
          label: "Yellow"
        }
      ];
    }),

    labelValue1: "January",
    lineValue1: 65,
    lineValue2: 59,
    lineData: computed('lineValue1', 'lineValue2', 'labelValue1', function(){
      return {
          labels: [this.get('labelValue1'), "February", "March", "April", "May", "June", "July"],
          datasets: [
              {
                  label: "My First dataset",
                  fillColor: "rgba(220,220,220,0.2)",
                  strokeColor: "rgba(220,220,220,1)",
                  pointColor: "rgba(220,220,220,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(220,220,220,1)",
                  data: [parseInt(this.get('lineValue1')), parseInt(this.get('lineValue2')), 80, 81, 56, 55, 40]
              },
              {
                  label: "My Second dataset",
                  fillColor: "rgba(151,187,205,0.2)",
                  strokeColor: "rgba(151,187,205,1)",
                  pointColor: "rgba(151,187,205,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(151,187,205,1)",
                  data: [28, 48, 40, 19, 86, 27, 90]
              }
          ]
      };
    }),
    lineData2: computed(function(){
      return {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
              {
                  label: "My First dataset",
                  fillColor: "rgba(220,220,220,0.2)",
                  strokeColor: "rgba(220,220,220,1)",
                  pointColor: "rgba(220,220,220,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(220,220,220,1)",
                  data: [parseInt(this.get('lineValue1')), parseInt(this.get('lineValue2')), 80, 81, 56, 55, 40]
              },
              {
                  label: "My Second dataset",
                  fillColor: "rgba(151,187,205,0.2)",
                  strokeColor: "rgba(151,187,205,1)",
                  pointColor: "rgba(151,187,205,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(151,187,205,1)",
                  data: [28, 48, 40, 19, 86, 27, 90]
              },
              {
                  label: "My Third dataset",
                  fillColor: "rgba(151,187,205,0.2)",
                  strokeColor: "rgba(151,187,205,1)",
                  pointColor: "rgba(151,187,205,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(151,187,205,1)",
                  data: [28, 48, 40, 19, 86, 27, 90]
              }
          ]
      };
    }),
    barData: computed(function(){
      return {
          labels: ["January", "February", "March"],
          datasets: [
              {
                  label: "My First dataset",
                  fillColor: "rgba(220,220,220,0.2)",
                  strokeColor: "rgba(220,220,220,1)",
                  pointColor: "rgba(220,220,220,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(220,220,220,1)",
                  data: [55, 41, 80]
              },
              {
                  label: "My Second dataset",
                  fillColor: "rgba(151,187,205,0.2)",
                  strokeColor: "rgba(151,187,205,1)",
                  pointColor: "rgba(151,187,205,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(151,187,205,1)",
                  data: [28, 48, 40]
              }
          ]
      };
    }),
  });

  var testData = ChartTestData.create();
  // Test Data


  test('it can be a pie chart', function(assert) {
    var component = this.owner.factoryFor('component:ember-chart').create({
      type: 'Pie',
      data: testData.get('pieData')
    });

    this.render();
    var chart = component.get('chart');

    assert.equal(chart.name, 'Pie');
    assert.equal(chart.segments.length, 3);
  });

  test('it can be a pie chart with legend', function(assert) {
    this.owner.factoryFor('component:ember-chart').create({
      type: 'Pie',
      data: testData.get('pieData'),
      legend: true
    });

    var chartParent = this.$().parent();

    assert.ok(chartParent.hasClass('chart-parent'));
    assert.ok(chartParent.find('.pie-legend').length);
  });

  test('it should rebuild the legend in case the chart changes', function(assert) {
    var component = this.owner.factoryFor('component:ember-chart').create({
      type: 'Pie',
      data: testData.get('pieData'),
      legend: true
    });

    var chartParent = this.$().parent();
    
    assert.ok(chartParent.find('.pie-legend').text().match(/Red/));

    // Update Data
    component.set('data', testData.get('pieData2'));
    
    assert.ok(chartParent.find('.pie-legend').text().match(/Black/), 'The legend should have updated');
  });

  test('it can be a line chart', function(assert) {
    var component = this.owner.factoryFor('component:ember-chart').create({
      type: 'Line',
      data: testData.get('lineData')
    });

    this.render();
    var chart = component.get('chart');

    assert.equal(chart.name, 'Line');
    assert.equal(chart.datasets.length, 2);
  });

  test('it can be a bar chart', function(assert) {
    var component = this.owner.factoryFor('component:ember-chart').create({
      type: 'Bar',
      data: testData.get('lineData')
    });

    this.render();
    var chart = component.get('chart');

    assert.equal(chart.name, 'Bar');
    assert.equal(chart.datasets.length, 2);
  });

  test('it can be a Radar chart', function(assert) {
    var component = this.owner.factoryFor('component:ember-chart').create({
      type: 'Radar',
      data: testData.get('lineData')
    });

    this.render();
    var chart = component.get('chart');

    assert.equal(chart.name, 'Radar');
    assert.equal(chart.datasets.length, 2);
  });

  test('it can be a Polar Area chart', function(assert) {
    var component = this.owner.factoryFor('component:ember-chart').create({
      type: 'PolarArea',
      data: testData.get('pieData')
    });

    this.render();
    var chart = component.get('chart');

    assert.equal(chart.name, 'PolarArea');
    assert.equal(chart.segments.length, 3);
  });

  test('it should update pie charts dynamically', function(assert) {
    var component = this.owner.factoryFor('component:ember-chart').create({
      type: 'Pie',
      data: testData.get('pieData')
    });

    this.render();
    var chart = component.get('chart');
    assert.equal(chart.segments[0].value, 300);

    // Update Data
    testData.set('pieValue1', 600);
    component.set('data', testData.get('pieData'));

    chart = component.get('chart');
    assert.equal(chart.segments[0].value, 600);
  });

  test('it should update charts dynamically', function(assert) {
    var component = this.owner.factoryFor('component:ember-chart').create({
      type: 'Line',
      data: testData.get('lineData')
    });

    this.render();
    var chart = component.get('chart');
    assert.equal(chart.datasets[0]['points'][0].value, 65);

    // Update Data
    testData.set('lineValue1', 105);
    component.set('data', testData.get('lineData'));

    chart = component.get('chart');
    assert.equal(chart.datasets[0]['points'][0].value, 105);

    // Update Labels
    testData.set('labelValue1', 'December');
    component.set('data', testData.get('lineData'));

    chart = component.get('chart');
    assert.equal(chart.scale.xLabels[0], 'December');
  });

  test('it should update pie chart if data structure changes', function(assert) {
    var component = this.owner.factoryFor('component:ember-chart').create({
      type: 'Pie',
      data: testData.get('pieData')
    });

    this.render();

    // Update Data
    component.set('data', testData.get('pieData2'));

    var chart = component.get('chart');
    var segments = A(chart.segments);

    assert.equal(segments.findBy('label', 'Red').value, 310);
    assert.equal(segments.findBy('label', 'Yellow').value, 101);
    assert.equal(segments.findBy('label', 'Black').value, 20);
    assert.equal(segments.length, 3);
  });

  test('it should rebuild line chart if data structure changes', function(assert) {
    var component = this.owner.factoryFor('component:ember-chart').create({
      type: 'Line',
      data: testData.get('lineData')
    });

    this.render();
    var chart = component.get('chart');
    assert.equal(chart.datasets.length, 2);

    // Update Data -- increase dataset
    component.set('data', testData.get('lineData2'));

    chart = component.get('chart');
    assert.equal(chart.datasets.length, 3);

    // Update Data -- decrease dataset
    component.set('data', testData.get('lineData'));

    chart = component.get('chart');
    assert.equal(chart.datasets.length, 2);
  });

  test('it should rebuild bar chart if data structure changes', function(assert) {
    var component = this.owner.factoryFor('component:ember-chart').create({
      type: 'Bar',
      data: testData.get('lineData')
    });

    this.render();
    var chart = component.get('chart');
    assert.equal(chart.datasets[0].bars.length, 7);

    // Update Data -- increase dataset
    component.set('data', testData.get('barData'));

    chart = component.get('chart');
    assert.equal(chart.datasets[0].bars.length, 3);
  });
});
