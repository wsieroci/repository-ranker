define([
  'underscore',
  'communicator',
  'backbone'
],
function( _, communicator, Backbone ) {
  'use strict';

  var comparators = {
    contributions: function(user) {
      var value = user.get('total');
      if(_.isUndefined(value)) {
        value = 0;
      }
      return -value;
    },
    followers: function(user) {
      var value = user.get('author').followers;
      if(_.isUndefined(value)) {
        value = 0;
      }
      return -value;
    },
    repos: function(user) {
      var value = user.get('author').public_repos;
      if(_.isUndefined(value)) {
        value = 0;
      }
      return -value;
    },
    gists: function(user) {
      var value = user.get('author').public_gists;
      if(_.isUndefined(value)) {
        value = 0;
      }
      return -value;
    }
  };

  communicator.reqres.setHandler('comparator:get', function (comparator) {
    return comparators[comparator];
  });
});