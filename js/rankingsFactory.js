rankingsTable.factory('rankingFactory', ['$http', function($http) {

  return $http.get('rankings.json')

}])
