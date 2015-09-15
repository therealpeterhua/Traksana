class CreateUserTeams < ActiveRecord::Migration
  def change
    create_table :user_teams do |t|
      t.integer :user_id, null: false
      t.integer :team_id, null: false

      t.timestamps
    end

    add_index :user_teams, :user_id
    add_index :user_teams, :team_id
  end
end
