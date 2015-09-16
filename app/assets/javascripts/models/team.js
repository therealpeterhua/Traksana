Trak.Models.Team = Backbone.Model.extend({
  urlRoot: "/api/teams",

  toJSON: function() {
    return {team: this.attributes};
  },

  members: function() {
    this._members = this._members || new Trak.Collections.Users();

    return this._members;
  },

  projects: function() {
    this._projects = this._projects || new Trak.Collections.Projects();

    return this._projects;
  },

  parse: function(response) {
    if (response.members) {
      this.members().set(response.members);
      delete response.members;
    }

    if (response.projects) {
      this.projects().set(response.projects);
      delete response.projects;
    }

    return response;
  }
})
