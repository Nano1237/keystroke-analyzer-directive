(function () {
    angular.module('keystroke-analyzer', [])
        .provider('keystroke', [
            function () {
                console.log('a');

                var strokeContainer = {};
                var elementToIndex = [];

                return {
                    $get: function () {
                        return {
                            addElement: function (element) {
                                var newId = elementToIndex.length;
                                element.keystokeId = newId;
                                elementToIndex.push(element);
                                strokeContainer[newId] = {
                                    strokes: [],
                                    element: element
                                };
                            },
                            addStroke: function (event, element) {
                                if (element && typeof element.keystokeId !== 'undefined') {
                                    strokeContainer[element.keystokeId].strokes.push(event);
                                }
                            },
                            getStrokes: function (elementOrIndex) {
                                var number;
                                if (typeof elementOrIndex === 'number') {
                                    number = elementOrIndex;
                                } else if (false) {
                                    number = elementOrIndex.keystokeId || false;
                                }
                                //
                                if (typeof strokeContainer[number] !== 'undefined') {
                                    return strokeContainer[number].strokes;
                                }
                            }
                        };
                    }
                }
            }
        ])
        .directive('keystroke', [
            'keystroke',
            function (keystroke) {
                return {
                    restrict: 'A',
                    link: function (scope, element) {
                        var ele = element[0];
                        keystroke.addElement(ele);
                        var prevValue = ele.value;
                        element.on('keyup', function (e) {
                            var newValue = ele.value;
                            keystroke.addStroke({
                                event: e,
                                time: Date.now(),
                                prevValue: prevValue,
                                newValue: newValue
                            }, ele);
                            prevValue = newValue;
                        });
                    }
                }
            }
        ]);
})();