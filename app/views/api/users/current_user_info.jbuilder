json.extract!(current_user, :email, :name)

json.tasks do
  json.array!(current_user.assigned_tasks) do |task|
    json.extract!(task, *task.attributes.keys)
  end
end
