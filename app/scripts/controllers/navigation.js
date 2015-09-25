define([
  'communicator',
  'views/navigationView',
  'backbone',
  'backbone.marionette'
],
function( communicator, NavigationView, Backbone ) {
  'use strict';

  var NavigationController = Backbone.Marionette.Controller.extend({
    initialize: function () {
      this._showNavigation();
    },
    _showNavigation: function () {
      var region = communicator.reqres.request('region:getRegion', 'navigation');
      var view = new NavigationView({region: region});
      region.show(view);
    }
  });

  var navigation;

  communicator.reqres.setHandler('controller:navigation', function () {
    if(!navigation) {
      navigation = new NavigationController();
    }
    
    return navigation;
  });

  return NavigationController;
});