define([
  'controllers/application',
  'backbone',
  'backbone.marionette'
],
function( ApplicationController, Backbone ) {
  'use strict';

  Showcase.View.BodyLayout = Marionette.LayoutView.extend({
    el: 'body',
    regions: {
      content: '.js-region-content',
      navigation: '.navbar',
      preview: new Showcase.Region.PreviewRegion('.js-region-preview'),
      notification: new Showcase.Region.ModalRegion('.js-region-notification'),
      notice: new Showcase.Region.ModalRegion('.js-region-notice'),
      email: new Showcase.Region.ModalRegion('.js-region-email')
    },
    ui: {},
    initialize: function () {
      footerChannel.commands.setHandler('loading', this.footerLoading.bind(this));
    }
  });
})