define([
  'models/user',
  'gh3',
  'backbone',
  'backbone.marionette'
],
function( UserModel, Gh3, Backbone ) {
  'use strict';

  debugger

  var UserCollection = Backbone.Collection.extend({
    initialize: function (model, options) {
      this.url = '/';
    },
    model: function (attributes, options) {
      return new UserModel(attributes, options);
    }
  });

  return UserCollection;
});