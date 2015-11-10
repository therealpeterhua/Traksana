class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.text :content
      t.integer :user_id
      t.integer :task_id

      t.timestamps
    end

    add_index :stories, :user_id
    add_index :stories, :task_id
  end
end
