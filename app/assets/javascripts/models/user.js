Trak.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

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
    if (response.teams) {
      this.teams().set(response.teams);

      delete response.teams;
    }

    return response;
  },

  parseHelper: function() {

  }
  //PH** - parse for tasks here!!
})
