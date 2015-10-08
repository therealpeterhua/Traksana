Trak.Utils = {};

Trak.Utils.imageName = function(user) {
  return user.escape('name').slice(0, 2).toUpperCase();
};

Trak.Utils.userAvatar = function(user) {
  return JST['partials/user_avatar']({ user: user });
};

Trak.Utils.modalHook = function() {
  return JST['partials/modal_hook']();
};

Trak.Utils.extend = function(parent_obj, target_obj) {
  Object.keys(parent_obj).forEach( function(key) {
    if (!target_obj.hasOwnProperty(key)) {
      target_obj[key] = parent_obj[key];
    }
  });
};

Trak.Utils.modalEvents = {
  'click div.modal': 'toggleModal',
  'click div.modal > div': 'stopPropagation'
};

Trak.Utils.modalFuncs = {
  toggleModal: function() {
    this.$('.modal-cover').toggleClass('hidden');
    this.$('.modal').toggleClass('hidden');
  },

  stopPropagation: function(e) {
    e.stopPropagation();
  },

  swapModal: function(view) {
    this.toggleModal();
    this._modalView && this._modalView.remove();
    this._modalView = view;
    this.$('.modal').html( this._modalView.render().$el );
  },
};

Trak.Utils.extendModals = function(view) {
  Trak.Utils.extend(Trak.Utils.modalEvents, view.events);
  Trak.Utils.extend(Trak.Utils.modalFuncs, view);
};
