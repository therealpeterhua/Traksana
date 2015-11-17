Trak.Collections.Stories = Backbone.Collection.extend({
  url: "/api/stories",
  model: Trak.Models.Story,

  getOrFetch: function(id) {
    var thisCollection = this;
    var getModel = thisCollection.get(id);

    if (getModel) {
      getModel.fetch();
    } else {
      getModel = new Trak.Models.Story({ id: id });
      thisCollection.add(getModel);
      getModel.fetch({
        error: function() {
          thisCollection.remove(getModel);
        }
      })
    }

    return getModel;
  },
})
