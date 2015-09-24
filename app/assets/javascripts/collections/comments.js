Trak.Collections.Comments = Backbone.Collection.extend({
  url: "/api/comments",
  model: Trak.Models.Comment,

  getOrFetch: function(id) {
    var thisCollection = this;
    var getModel = thisCollection.get(id);

    if (getModel) {
      getModel.fetch();
    } else {
      getModel = new Trak.Models.Comment({ id: id });
      thisCollection.add(getModel);
      getModel.fetch({
        error: function() {
          thisCollection.remove(getModel);
        }
      });
    }
    return getModel;
  }
})
