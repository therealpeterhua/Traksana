Trak.Models.Project = Backbone.Model.extend({
  url: "/api/projects",

  toJSON: function() {
    return {project: this.attributes};
  }
})
