class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.integer :team_id, null: false
      t.string :code_name, null: false
      t.integer :owner_id, null: false
      t.integer :completer_id, null: true

      t.timestamps
    end

    add_index :projects, :team_id
    add_index :projects, :owner_id
  end
end
