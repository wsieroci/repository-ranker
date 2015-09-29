define([
  'hbs!tmpl/error',
  'backbone',
  'backbone.marionette'
],
function( errorTemplate, Backbone ) {
  'use strict';

  var ErrorView = Backbone.Marionette.ItemView.extend({
    className: 'error-view',
    template: errorTemplate
  });

  return ErrorView;
});