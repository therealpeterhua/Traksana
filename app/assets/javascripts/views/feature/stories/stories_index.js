Trak.Views.StoriesIndex = Backbone.CompositeView.extend({
  template: 'stories/stories_index',

  events: {

  },

  initialize: function() {
    this.listenTo(this.collection, 'sync add', this.render)
  },

  render: function() {
    var content = this.template({stories: this.collection})
    this.$el.html(content);
    this.addStoriesLineItems();

    return this;
  },

  addStoriesLineItems: function() {
    this.collection.each( function(story) {
      var StoryItem = new Trak.Views.StoriesIndexItem({ model: story })
      this.addSubview('div.story-items', StoryItem)
    })
  },
})
