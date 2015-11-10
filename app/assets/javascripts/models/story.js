Trak.Models.Story = Backbone.Model.extend({
  urlRoot: "/api/stories",

  toJSON: function() {
    return { story: this.attributes };
  },
})
