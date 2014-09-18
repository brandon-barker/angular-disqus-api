'use strict';

// Set the jasmine fixture path
// jasmine.getFixtures().fixturesPath = 'base/';

describe('angular-disqus-api', function() {

  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function(module) {
    return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function() {

    // Get module
    module = angular.module('angular-disqus-api');
    dependencies = module.requires;
  });

  it('should load config module', function() {
    expect(hasModule('ngDisqusApi')).toBeTruthy();
  });
});
