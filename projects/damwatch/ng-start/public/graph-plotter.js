/**
 * Created by ArunaTebel on 9/4/2015.
 */

var graphPlotter = angular.module('graphPlotter', []);

graphPlotter.directive('linePlot', [function () {
    function linkFunc(scope, element, attrs) {
        scope.$watch('graphPlots', function (plots) {
            Plotly.newPlot(element[0], plots);
        });
    }

    return {
        link: linkFunc
    };
}]);

