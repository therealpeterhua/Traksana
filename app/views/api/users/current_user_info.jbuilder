json.extract!(current_user, :email, :name)

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
    json.extract!(coworker, :email, :name)
  end
end
#PH** - use this for fuzzy searching for team members to add
