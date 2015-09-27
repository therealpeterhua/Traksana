//PH - don't need this to be invoked. It's loaded up anyway.

Trak.Utils = {};

Trak.Utils.imageName = function(user) {
  //If name has a space, do something.
    //name matches any letters + space + letters?
    //split on space, take the first two of each
  //ELSE...

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
//PH -- use this to extend the basic MODAL VIEW functions everywhere!
