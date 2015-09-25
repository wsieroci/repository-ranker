define([
  'handlebars',
  'hbs!tmpl/navigation',
  'backbone',
  'backbone.marionette'
],
function( Handlebars, navigationTemplate, Backbone ) {
  'use strict';

  var NavigationView = Backbone.Marionette.ItemView.extend({
    className: 'container',
    template: navigationTemplate
  });

  return NavigationView;
});