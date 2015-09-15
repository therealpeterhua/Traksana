Trak.Models.Team = Backbone.Model.extend({
  urlRoot: "/api/teams",

  toJSON: function() {
    return {team: this.attributes};
  },

  members: function() {
    this._members = this._members || new Trak.Collections.Users();

    return this._members;
  },

  parse: function(response) {
    if (response.members) {
      this.members().set(response.members);
      delete response.members;
    }

    return response;
  }
})
