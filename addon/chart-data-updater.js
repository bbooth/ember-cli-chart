import { A } from '@ember/array';
import EmberObject from '@ember/object';

export default EmberObject.extend({
  redraw: false,
  updateByType: function() {
    var data = this.get('data');

    if (data.datasets) {
      return this.updateLinearCharts();
    }
    if (Array.isArray(data)) {
      return this.updatePieCharts();
    }
    return this.get('redraw');
  },

  updateLinearCharts: function() {
    var datasets = this.get('data').datasets;
    var labels = this.get('data').labels;
    var chart = this.get('chart');
    var self = this;

    if (chart.datasets.length !== datasets.length) {
      return this.set('redraw', true);
    } else if (typeof chart.datasets[0] !== 'undefined' && typeof chart.datasets[0].bars !== 'undefined') {
      if (chart.datasets[0].bars.length !== datasets[0].data.length) {
        return this.set('redraw', true);
      }
    }

    if (typeof chart.scale !== 'undefined') {
      // Update Labels
      chart.scale.xLabels = labels;

      // Update dataset
      datasets.forEach(function(dataset, i) {
        var chartDataset = chart.datasets[i];

        if (typeof chartDataset !== 'undefined') {
          try {
            dataset.data.forEach(function(item, j) {
              item = item || 0;
              if (typeof chartDataset.bars !== 'undefined') {
                chartDataset.bars[j].value = item;
              } else {
                chartDataset.points[j].value = item;
              }
            });
          } catch (e) {
            if (e instanceof TypeError) {
              self.set('redraw', true);
            }
            else {
              console.error(e);
            }
          }
        }
      });
    }

    return this.get('redraw');
  },

  updatePieCharts: function() {
    var data = A(this.get('data'));
    var chart = this.get('chart');
    var chartSegments = A(chart.segments);

    chart.segments.forEach(function(segment, i) {
      var updatedSegment = data.findBy('label', segment.label);
      if (updatedSegment) {
        // Same segment exists in new data
        chart.segments[i].value = updatedSegment.value || 0;
      } else {
        // Segment does not exist anymore in new data
        chart.removeData(i);
      }
    });

    data.forEach(function(segment) {
      var currentSegment = chartSegments.findBy('label', segment.label);
      if (!currentSegment) {
        chart.addData(segment);
      }
    });

    return this.get('redraw');
  }

});
