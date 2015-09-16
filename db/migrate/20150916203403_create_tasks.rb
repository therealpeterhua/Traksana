class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :creator_id, null: false
      t.integer :project_id, null: false
      t.string :title, null: false
      t.text :description, null: true
      t.integer :completer_id, null: true

      t.timestamps
    end

    add_index :tasks, :creator_id
    add_index :tasks, :project_id
    add_index :tasks, :completer_id
  end
end
