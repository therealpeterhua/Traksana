Trak.Models.Comment = Backbone.Model.extend({
  urlRoot: "/api/comments",

  toJSON: function() {
    return { comment: this.attributes };
  },

  author: function() {
    this._author = this._author || new Trak.Models.User();
    //PH** - only 1 author -- just set attributes on the user model..
    return this._author;
  },

  parse: function(response) {
    if (response.author) {
      this.author().set(response.author);
      delete response.author;
    }
    return response;
  },
})
