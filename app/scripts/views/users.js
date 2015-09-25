define([
  'handlebars',
  'hbs!tmpl/welcome',
  'backbone',
  'backbone.marionette'
],
function( Handlebars, welcomeTemplate, Backbone ) {
  'use strict';

  var UserRowView = Backbone.Marionette.ItemView.extend({
    className: 'item',
    template: welcomeTemplate
  });

  var UsersView = Backbone.Marionette.CollectionView.extend({
    className: 'content',
    childView: UserRowView
  });

  return UsersView;
});