define([
  'communicator',
  'handlebars',
  'hbs!tmpl/navigation',
  'backbone',
  'backbone.marionette'
],
function( communicator, Handlebars, navigationTemplate, Backbone ) {
  'use strict';

  var NavigationView = Backbone.Marionette.ItemView.extend({
    className: 'navigation',
    template: navigationTemplate,
    ui: {
      sort: '.js-sort'
    },
    events: {
      'click @ui.sort': '_sort'
    },
    _sort: function (event) {
      event && event.preventDefault();
      var sortType = $(event.currentTarget).attr('data-sort');
      communicator.command.execute('controller:users:sort', sortType);
    }
  });

  return NavigationView;
});