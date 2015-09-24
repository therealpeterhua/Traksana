Trak.Models.Comment = Backbone.Model.extend({
  urlRoot: "/api/comments",

  toJSON: function() {
    return { project: this.attributes };
  },
})
