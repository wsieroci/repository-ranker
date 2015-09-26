define([
  'handlebars',
  'hbs!tmpl/userRow',
  'backbone',
  'backbone.marionette'
],
function( Handlebars, userRowTemplate, Backbone ) {
  'use strict';

  var UserRowView = Backbone.Marionette.ItemView.extend({
    className: 'user-item',
    tagName: 'li',
    template: userRowTemplate
  });

  var UsersView = Backbone.Marionette.CollectionView.extend({
    className: 'user-list',
    tagName: 'ul',
    childView: UserRowView
  });

  return UsersView;
});