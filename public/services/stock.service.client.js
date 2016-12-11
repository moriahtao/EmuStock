(function () {
    angular
        .module('EmuStock')
        .factory('StockService', StockService);

    function StockService($http) {
        return {
            lookup: lookup,
            quote: quote,
            chart: chart
        };

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
                NumberOfDays: 5,
                DataPeriod: 'Minute',
                DataInterval: 5,
                Elements: [
                    {
                        Symbol: symbol,
                        Type: 'price',
                        Params: ["ohlc"]
                    }
                ]
            });
            return $http.jsonp(urlBuilder('InteractiveChart', 'parameters', chartReq));
        }
    }

})();
