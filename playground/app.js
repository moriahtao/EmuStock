(function () {
    angular
        .module('PlaygroundApp', [])
        .factory('StockService', StockService)
        .controller('PlaygroundAppController', PlaygroundAppController);

    function StockService($http) {
        return {
            lookup: lookup,
            quote: quote,
            chart: chart,
        }

        function urlBuilder(fn, key, value) {
            var base = 'http://dev.markitondemand.com/MODApis/Api/v2/';
            var jsonp = '/jsonp?callback=JSON_CALLBACK&';
            return base + fn + jsonp + key + '=' + value;
        }

        function lookup(input) {
            return $http.jsonp(urlBuilder('Lookup', 'input', input));
        }

        function quote(symbol) {
            return $http.jsonp(urlBuilder('Quote', 'symbol', symbol));
        }

        function chart(symbol) {
            var chartReq = JSON.stringify({
                Normalized: false,
                NumberOfDays: 30,
                DataPeriod: 'Day',
                Elements: [
                    {
                        Symbol: symbol,
                        Type: 'price',
                        Params: ["ohlc"],
                    }
                ],
            });
            return $http.jsonp(urlBuilder('InteractiveChart', 'parameters', chartReq));
        }
    }

    function PlaygroundAppController(StockService) {
        const vm = this;

        vm.lookup = lookup;
        vm.quote = quote;

        function lookup() {
            StockService
                .lookup(vm.input)
                .success(function (data) {
                    console.log(data);
                    vm.result = data;
                });
        }

        function quote(symbol) {
            StockService
                .quote(symbol)
                .success(function (data) {
                    console.log(data);
                    vm.details = data;
                });
            chart(symbol);
        }

        function chart(symbol) {
            StockService
                .chart(symbol)
                .success(function (data) {
                    console.log(data);
                    vm.chart = data;
                    var points = [];
                    for (var i = 0; i < vm.chart.Dates.length; i++) {
                        points.push([
                            Date.parse(vm.chart.Dates[i]),
                            vm.chart.Elements[0].DataSeries.close.values[i],
                        ]);
                    }
                    $('#stock-chart').highcharts('StockChart', {

                        rangeSelector: {
                            selected: 1
                        },

                        title: {
                            text: 'AAPL Stock Price'
                        },

                        series: [
                            {
                                name: 'AAPL',
                                data: points,
                                tooltip: {
                                    valueDecimals: 2
                                },
                            },
                        ]
                    });
                })
                .error(function (err) {
                    console.error(err);
                });
        }
    }

})();
