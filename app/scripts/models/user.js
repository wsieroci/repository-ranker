define([
  'backbone',
  'backbone-associations',
  'backbone.marionette'
],
function( Backbone, Associations ) {
  'use strict';

  var UserModel = Associations.AssociatedModel.extend({
    defaults: {
      name: ''
    }
  });

  return UserModel;
});