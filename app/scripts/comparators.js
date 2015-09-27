define([
  'underscore',
  'communicator',
  'backbone'
],
function( _, communicator, Backbone ) {
  'use strict';

  function defaultValue(value) {
    if(_.isUndefined(value)) {
      value = 0;
    }

    return value;
  }

  var comparators = {
    contributions: function(user) {
      var value = user.get('total');
      value = defaultValue(value);
      return -value;
    },
    followers: function(user) {
      var value = user.get('author').followers;
      value = defaultValue(value);
      return -value;
    },
    repos: function(user) {
      var value = user.get('author').public_repos;
      value = defaultValue(value);
      return -value;
    },
    gists: function(user) {
      var value = user.get('author').public_gists;
      value = defaultValue(value);
      return -value;
    }
  };

  communicator.reqres.setHandler('comparator:get', function (comparator) {
    return comparators[comparator];
  });
});