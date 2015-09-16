json.extract! @team, :id, :leader_id, :moniker, :created_at, :updated_at

json.members do
  json.array!(@team.members) do |member|
    json.extract!(member, :id, :email, :name, :created_at, :updated_at)
  end
end

json.projects do
  json.array!(@team.projects) do |project|
    json.extract!(project, *project.attributes.keys)      #PH - extracts all
  end
end
