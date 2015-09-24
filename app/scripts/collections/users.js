define([
  'models/user',
  'backbone',
  'backbone.marionette'
],
function( UserModel, Backbone ) {
  'use strict';

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