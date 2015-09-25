json.extract!(@task, *@task.attributes.keys)

json.comments do
  json.array!(@task.comments) do |comment|
    json.extract!(comment, *comment.attributes.keys)

    json.author do
      json.extract(comment.author, :id, :name, :email)
      json.avatar asset_path(comment.author.avatar.url)
    end

  end
end
