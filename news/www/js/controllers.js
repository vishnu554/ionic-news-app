angular.module('starter.controllers', [])


  .service('newService', ['$http', function ($http) {
    var source = ['abc-news-au', 'arc-technica', 'associated-press', 'bbc-news', 'bbc-sport', 'blid', 'bloomberg', 'business-insider', 'cnbc', 'cnn', 'ign', 'mashable', 'hacker-news', 'mtv-news', 'reddit-r-all', 'the-hindu', 'the-next-web', 'wired-de', 'google-news', 'fortune', 'focus', 'financial-times', 'entertainment-weekly', 'espn', 'engadget', 'die-zeit'];
    function getNews(index, cb) {
      $http({
        method: 'GET',
        url: 'https://newsapi.org/v1/articles',
        params: {
          source: source[index],
          apiKey: '6bdfe5da27f44077a59435fd8d432686'
        }
      }).then(function successCallback(response) {
        return cb(response);
      }, function errorCallback(response) {
        return cb(response);
      });
    }
    return {
      getNews: getNews
    };
  }])

  .controller('NewsCtrl', ['$scope', 'newService', function ($scope, newService) {
    var source = ['abc-news-au', 'arc-technica', 'associated-press', 'bbc-news', 'bbc-sport', 'blid', 'bloomberg', 'business-insider', 'cnbc', 'cnn', 'ign', 'mashable', 'hacker-news', 'mtv-news', 'reddit-r-all', 'the-hindu', 'the-next-web', 'wired-de', 'google-news', 'fortune', 'focus', 'financial-times', 'entertainment-weekly', 'espn', 'engadget', 'die-zeit'];
    $scope.currIndex = 0;

    $scope.articles = [];

    $scope.loadNews = function () {
      newService.getNews($scope.currIndex, function (response) {
        $scope.$broadcast('scroll.refreshComplete');
        if ($scope.currIndex === source.length) {
          $scope.currIndex = 0;
        } else {
          $scope.currIndex++;
        }
        $scope.articles = response.data.articles.concat($scope.articles);
        if ($scope.articles.length > 15) {
          $scope.articles.length = 15;
        } 
      });
    };

    $scope.loadNews();

    $scope.doRefresh = function () {
      $scope.loadNews();
    };

  }])


  .controller('AboutCtrl', function ($scope) {
    
  });


