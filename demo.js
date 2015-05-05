(function () {
    angular.module('demo', [
        'keystroke-analyzer'
    ]).config([
        'keystrokeProvider',
        function (keystrokeProvider) {
            console.log(keystrokeProvider)
        }
    ]).controller('Ctrol', [
        '$scope',
        '$timeout',
        'keystroke',
        function ($scope, $timeout, keystroke) {
            $scope.InputA = '';
            $scope.InputB = '';
            function simulateTyping( strokes) {
                var firstType = strokes[0].time;
                for (var i = 0, j = strokes.length; i < j; i++) {
                    (function (stroke) {
                        $timeout(function () {
                            $scope.InputA = stroke.newValue;
                        }, stroke.time - firstType);
                    })(strokes[i]);
                }
            }

            $scope.getStorkes = function (id) {
                if (id === 0) {
                    simulateTyping(keystroke.getStrokes(id));
                } else {
                    simulateTyping( keystroke.getStrokes(id));
                }
            }
        }
    ]);
})();