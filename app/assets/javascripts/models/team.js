Trak.Models.Team = Backbone.Model.extend({
  urlRoot: "/api/teams",

  toJSON: function() {
    return {team: this.attributes};
  },

  members: function() {
    //get users here
  }
})
