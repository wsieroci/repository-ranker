define([
  'backbone',
  'backbone-associations',
  'backbone.marionette'
],
function( Backbone, Associations ) {
  'use strict';

  var RepositoryModel = Associations.AssociatedModel.extend({
    defaults: {
    }
  });

  return RepositoryModel;
});