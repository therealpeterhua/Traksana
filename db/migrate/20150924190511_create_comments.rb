class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :author_id, null: false
      t.integer :task_id, null: false
      t.text :content, null: false

      t.timestamps
    end

    add_index :comments, :author_id
    add_index :comments, :task_id
  end
end
