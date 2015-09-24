define([
  'backbone',
  'backbone.marionette'
],
function( Backbone ) {
  'use strict';

  var BodyLayoutView = Backbone.Marionette.LayoutView.extend({
    el: 'body',
    regions: {
      content: '.js-main-container'
    },
    ui: {},
    initialize: function () {
    }
  });

  return new BodyLayoutView();
})