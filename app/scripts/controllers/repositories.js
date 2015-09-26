define([
  'communicator',
  'controllers/base',
  'views/repositories'
],
function( communicator, BaseController, RepositoriesView ) {
  'use strict';

  function getRepositories() {
    var repositories = communicator.reqres.request('collection:getOrganizationRepositories');
    return repositories;
  }

  var RepositoriesController = BaseController.extend({
    initialize: function () {
      this._showLoadingView();
      getRepositories().then(function (repositories) {
        this._showRepositories(repositories);
      }.bind(this));
    },
    _showRepositories: function (repositories) {
      var region = communicator.reqres.request('region:getRegion', 'content');
      var view = new RepositoriesView({collection: repositories, region: region});
      region.show(view);
    }
  });

  communicator.command.setHandler('route:repositories', function () {
    communicator.command.execute('controller:navigation:hideSorting');
    return new RepositoriesController();
  });
});