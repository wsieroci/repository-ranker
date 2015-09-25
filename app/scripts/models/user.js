define([
  'backbone',
  'backbone-associations',
  'backbone.marionette'
],
function( Backbone, Associations ) {
  'use strict';

  var USERS_API = 'https://api.github.com/users/';

  var UserModel = Associations.AssociatedModel.extend({
    defaults: {
      total: 0,
      repositories: {}
    },
    initialize: function (model, options) {
      this.set('id', model.author.login);
      this._isAuthorComplete = false;
    },
    fetchAuthor: function () {
      if(this._isAuthorComplete === false) {
        var authorModel = new Backbone.Model();
        authorModel.url = USERS_API + this.get('author').login;
        this._isAuthorComplete = true
        return authorModel.fetch().then(function () {
          this.set('author', authorModel.attributes);
          return this;
        }.bind(this));
      } else {
        var deferred = $.Deferred();
        deferred.resolve(this);
        return deferred.promise();
      }
    },
    addRepository: function(repository) {
      var fullName = repository.get('full_name');
      this.get('repositories')[fullName] = repository;
    }
  });

  return UserModel;
});