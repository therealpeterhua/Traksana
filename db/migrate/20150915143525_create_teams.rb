class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.integer :leader_id, null: false
      t.string :moniker, null: false

      t.timestamps
    end

    add_index :teams, :leader_id
  end
end
