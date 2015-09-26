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
      this._view = new NavigationView({region: region});
      region.show(this._view);
    },
    hideSorting: function () {
      this._view.hideSorting();
    },
    showSorting: function () {
      this._view.showSorting();
    }
  });

  var navigation;

  communicator.reqres.setHandler('controller:navigation', function () {
    if(!navigation) {
      navigation = new NavigationController();
    }
    
    return navigation;
  });

  communicator.command.setHandler('controller:navigation:hideSorting', function () {
    if(navigation) {
      navigation.hideSorting();
    }
  });

  communicator.command.setHandler('controller:navigation:showSorting', function () {
    if(navigation) {
      navigation.showSorting();
    }
  });

  return NavigationController;
});