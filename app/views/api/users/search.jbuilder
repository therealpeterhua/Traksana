json.array!(@matches) do |match|
  json.extract!(match, :id, :name, :email)
  json.avatar(asset_path(match.avatar.url))
end
