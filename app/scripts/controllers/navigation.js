define([
  'communicator',
  'controllers/base',
  'views/navigation'
],
function( communicator, BaseController, NavigationView ) {
  'use strict';

  var NavigationController = BaseController.extend({
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