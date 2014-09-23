(function () {
  'use strict';

  angular.module('ngDisqusApi', []);

  /*
   * ngDisqus Provider
   */

  angular.module('ngDisqusApi').provider('$disqusApi', disqusApiProvider);

  /*jshint validthis: true */
  function disqusApiProvider() {
    var forumName;
    var disqusApiKey;
    var disqusApiBaseUrl = 'https://disqus.com/api/3.0/';

    this.setForumName = function (name) {
      forumName = name;
    };

    this.setApiKey = function (apiKey) {
      disqusApiKey = apiKey;
    };

    this.getApiKey = function () {
      return disqusApiKey;
    };

    this.getApiUrl = function () {
      return disqusApiBaseUrl;
    };

    this.getForumName = function () {
      return forumName;
    };

    this.$get = function () {
      return {
        setForumName: this.setForumName,
        setApiKey: this.setApiKey,
        getApiKey: this.getApiKey,
        getApiUrl: this.getApiUrl,
        getForumName: this.getForumName
      };
    };
  }

  /*
   * disqusApi Service
   */
  angular.module('ngDisqusApi').factory('disqusApi', disqusApiService);

  disqusApiService.$inject = ['$http', '$q', '$log', '$disqusApi'];

  function disqusApiService($http, $q, $log, $disqusApi) {
    // Get required values from provider
    var apiKey = $disqusApi.getApiKey();
    var apiUrl = $disqusApi.getApiUrl();
    var forumName = $disqusApi.getForumName();

    var requiredParams = {
      forum: forumName,
      api_key: apiKey
    };

    var service = {
      get: getRequest
    };

    return service;

    function getRequest(category, method, params) {
      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: apiUrl + '/' + category + '/' + method + '.json',
        params: angular.extend(requiredParams, params)
      }).success(function (data) {
        deferred.resolve(data.response);
      }).error(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }
  }

  /*
   * Recent Comments Directive
   */
  angular.module('ngDisqusApi').directive('recentComments', recentCommentsDirective);

  function recentCommentsDirective() {
    return {
      restrict: 'EA',
      replace: true,
      template: '<div class="row" ng-repeat="comment in comments" class="comment">' +
        '<div class="col-lg-2">' +
        '<img ng-src="{{comment.author.avatar.small.permalink}}" class="img-rounded img-responsive" />' +
        '</div>' +
        '<div class="col-lg-10">' +
        '<span><a ng-href="{{comment.author.profileUrl}}" target="_blank">{{comment.author.name}}</a> <small>- {{comment.createdAt | date:"medium"}}</small></span>' +
        '<div style="white-space: pre-line;">' +
        '{{comment.raw_message}}' +
        '</div>' +
        '<div ng-repeat="image in comment.media">' +
        '<a ng-href="{{image.location}}" target="_blank"><img ng-src="{{image.thumbnailURL}}" class="img-responsive" /></a>' +
        '</div>' +
        '<br />' +
        '<div>Posted on <a ng-href="{{comment.thread.link}}" target="_blank">{{comment.thread.title}}</a></div><br />' +
        '</div></div>',
      scope: {
        params: '='
      },
      controller: ['$scope', 'disqusApi', function ($scope, disqusApi) {
        var params = $scope.params || {};

        disqusApi.get('forums', 'listPosts', params).then(function (comments) {
          $scope.comments = comments;
          console.log(comments);
        });
      }]
    };
  }
})();
