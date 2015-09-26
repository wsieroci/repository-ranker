define([
  'communicator',
  'controllers/base',
  'views/repository',
  'backbone'
],
function( communicator, BaseController, RepositoryView, Backbone ) {
  'use strict';

  function getRepository(id) {
    var repository = communicator.reqres.request("model:getRepository", id);
    return repository;
  }

  var RepositoryController = BaseController.extend({
    initialize: function (options) {
      var id = options.id;
      this._showLoadingView();
      _.delay(function () {
        getRepository(id).then(function (repository) {
          this._showRepository(repository);
        }.bind(this));
      }.bind(this), 0);
    },
    _showRepository: function (repository) {
      var region = communicator.reqres.request('region:getRegion', 'content');
      var view = new RepositoryView({model: repository, collection: repository.get('users'), region: region});
      region.show(view);
    }
  });

  communicator.command.setHandler('route:repository', function (id) {
    communicator.command.execute('controller:navigation:hideSorting');
    return new RepositoryController({id: id});
  });
});