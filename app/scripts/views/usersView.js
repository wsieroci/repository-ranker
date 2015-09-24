define([
  'backbone',
  'backbone.marionette'
],
function( Backbone ) {
  'use strict';

  var UsersView = Backbone.Marionette.ItemView.extend({
    className: 'content'
  });

  return UsersView;
})