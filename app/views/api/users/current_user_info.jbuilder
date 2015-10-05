json.extract!(current_user, :id, :email, :name)
json.avatar asset_path(current_user.avatar.url)

json.assigned_tasks do
  json.array!(current_user.assigned_tasks) do |task|
    json.extract!(task, *task.attributes.keys)
  end
end

json.teams do
  json.array!(current_user.teams) do |team|
    json.extract!(team, *team.attributes.keys)
  end
end

json.coworkers do
  json.array!(current_user.coworkers) do |coworker|
    json.extract!(coworker, :id, :email, :name)
    json.avatar asset_path(coworker.avatar.url)
  end
end

json.session_id current_session.id
