json.extract! @team, :id, :leader_id, :moniker, :created_at, :updated_at

json.members do
  json.array!(@team.members) do |member|
    json.extract!(member, :id, :email, :name, :created_at, :updated_at)
    json.avatar asset_path(member.avatar.url)
    #PH QUESTION - is this the asset_path specified in development.rb for Paperclip? ('which convert' in terminal: tool for conversion?)
  end
end

json.projects do
  json.array!(@team.projects) do |project|
    json.extract!(project, *project.attributes.keys)      #PH - extracts all

    json.tasks do               #PH - includes tasks for each project
      json.array!(project.tasks) do |task|
        json.extract!(task, *task.attributes.keys)

        json.assigned_users do
          json.array!(task.assigned_users) do |assigned_user|
            json.extract!(assigned_user, :id, :email, :name)
            json.avatar asset_path(assigned_user.avatar.url)
          end
        end

      end
    end

  end
end

#PH** exclude unneeded attributes here when done
