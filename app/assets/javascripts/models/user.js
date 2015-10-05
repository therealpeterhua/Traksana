Trak.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  toJSON: function() {
    return { user: this.attributes };
  },

  teams: function() {
    this._teams = this._teams || new Trak.Collections.Teams();
    return this._teams;
  },

  coworkers: function() {
    this._coworkers = this._coworkers || new Trak.Collections.Users();
    return this._coworkers;
  },

  assignedTasks: function() {
    this._assignedTasks = this._assignedTasks || new Trak.Collections.Tasks();
    return this._assignedTasks;
  },

  parse: function(response) {
    this.parseHelper(response, this.assignedTasks, 'assigned_tasks');
    this.parseHelper(response, this.teams, 'teams');
    this.parseHelper(response, this.coworkers, 'coworkers');

    if (response.session_id) {
      Trak.sessionId = response.session_id;
      delete response.session_id;
    }

    return response;
  },

  parseHelper: function(respObj, assocFunc, attr) {
    if ( respObj[attr] ) {
      assocFunc.apply(this).set( respObj[attr] );
      delete respObj[attr];
    }
  },
})
