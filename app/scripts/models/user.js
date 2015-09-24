define([
  'backbone',
  'backbone-associations',
  'backbone.marionette'
],
function( Backbone, Associations ) {
  'use strict';

  var UserModel = Associations.AssociatedModel.extend({
    defaults: {
      total: 0
    },
    parse: function (response) {
      this.set('id', response.author.login)
      return response;
    }
  });

  return UserModel;
});