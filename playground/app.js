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

        function chart(chartReq) {
            chartReq = JSON.stringify({
                Normalized: false,
                NumberOfDays: 5,
                DataPeriod: 'Day',
                Elements: [
                    {
                        Symbol: 'AAPL',
                        Type: 'price',
                        Params: ["ohlc"],
                    }
                ],
            });
            return $http.jsonp(urlBuilder('InteractiveChart', 'parameters', chartReq));
        }
    }

    function PlaygroundAppController(StockService) {
        var vm = this;
        StockService
            .lookup('fb')
            .success(function (data) {
                console.log(data);
            });
        StockService
            .quote('aapl')
            .success(function (data) {
                console.log(data);
            });
        StockService
            .chart()
            .success(function (data) {
                console.log(data);
            })
            .error(function (err) {
                console.error(err);
            });
    }

})();
