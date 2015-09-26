define([
  'handlebars',
  'hbs!tmpl/repositoryListRow',
  'backbone',
  'backbone.marionette'
],
function( Handlebars, repositoryRowTemplate, Backbone ) {
  'use strict';

  var RepositoryRowView = Backbone.Marionette.ItemView.extend({
    className: 'repository-item',
    tagName: 'li',
    template: repositoryRowTemplate
  });

  var RepositoriesView = Backbone.Marionette.CollectionView.extend({
    className: 'repository-list',
    tagName: 'ul',
    childView: RepositoryRowView
  });

  return RepositoriesView;
});