Trak.Collections.Users = Backbone.Collection.extend({
  url: "/api/users",
  model: Trak.Models.User,

  getOrFetch: function(id) {
    var thisCollection = this;
    var getModel = thisCollection.get(id);

    if (getModel) {
      getModel.fetch();
    } else {
      getModel = new Trak.Models.User({id: id});
      thisCollection.add(getModel);
      getModel.fetch({
        error: function() {
          thisCollection.remove(getModel);
        }
      });
    }

    return getModel;
  },
})
