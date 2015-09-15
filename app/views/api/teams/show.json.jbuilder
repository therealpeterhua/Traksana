json.extract! @team, :id, :leader_id, :moniker, :created_at, :updated_at
json.members do
  json.array!(@team.members) do |member|
    json.extract!(member, :id, :email, :name, :created_at, :updated_at)
  end
end

# json.members @ team.members do |member|
# end
# PH -- look up how you did below in Trello project
