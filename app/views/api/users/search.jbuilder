json.array!(@matches) do |match|
  json.extract!(match, :id, :name, :email)
  json.avatar(asset_path(assigned_user.avatar.url))
end
