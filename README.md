angular-disqus-api [![Build Status](https://travis-ci.org/brandon-barker/angular-disqus-api.svg?branch=master)](https://travis-ci.org/brandon-barker/angular-disqus-api)
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

You will have access to a ```disqusApi``` service which you can inject into your controllers and use to retrieve data from the API.

#### Methods

* ```get(category, method, params)```

> A generic method supporting all GET requests to the Disqus API (```api_key``` and ```forum``` always passed by default, all other parameters are optional)

##### Params

* ```category```: The Disqus API category, eg: `forum`
* ```method```: The Disqus API method to call, eg: `listPosts`
* ```params```: All supported parameters detailed in the [Disqus API](https://disqus.com/api/docs/)

#### Example

```js
angular.module('myApp').controller('myCtrl', ['$scope', 'disqusApi', function ($scope, disqusApi) {
    // Pass through any additional parameters to the API
    var params = {
      limit: 5,
      related: 'thread'
    }

    disqusApi.get('forums', 'listPosts', params).then(function (comments) {
        $scope.comments = comments;
        console.log(comments);
    });
}]);
```

## Directives

There is also a helpful directive included for displaying recent comments across your forum, for example on your home page or in a news feed of some kind. This was created due to the Recent Comments widget being discontinued by Disqus.

#### Example

##### As an element

```
<recent-comments params="{limit: 5, related:'thread'}"></recent-comments>
```

##### As an attribute

```
<div recent-comments params="{limit: 5, related:'thread'}"></div>
```

> You can pass through any params accepted by the Disqus API, either as an inline object in your HTML or as an object on ```$scope```. This directive uses the ```listPosts``` method on the ```forum``` category in the [Disqus API](https://disqus.com/api/docs/forums/listPosts/)
