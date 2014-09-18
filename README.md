angular-disqus-api
==================

A Disqus API wrapper for AngularJS featuring helpful directives for easily adding widgets to your pages

## Installation

#### via bower:
```
$ bower install angular-disqus-api
```

## Usage

1. Include **angular-disqus-api** as a dependency for your app

  ```js
  angular.module('myApp', ['ngDisqusApi'])
  ```
  
2. Configure component via **$disqusApiProvider**

  ```js
  angular.module('myApp').config(function ($disqusApiProvider) {
    // Set our API key for Disqus
    $disqusApiProvider.setApiKey('123456789');
    
    // Set our forum name for Disqus
    $disqusApiProvider.setForumName('mycoolforum');
  }
  ```

## Service

You will have access to a ```disqusApi``` service which you can use to retrieve data from the API.

Example:

```js
angular.module('myApp').controller('myCtrl', ['$scope', 'disqusApi', function ($scope, disqusApi) {
    // Pass through any additional parameters to the API
    var params = {
      limit: 5,
      related: 'thread'
    }

    disqusApi.getRequest('forums', 'listPosts', params).then(function (comments) {
        $scope.comments = comments;
        console.log(comments);
    });
}]);
```
