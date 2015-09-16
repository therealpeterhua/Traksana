class CreateUserTasks < ActiveRecord::Migration
  def change
    create_table :user_tasks do |t|
      t.integer :user_id
      t.integer :task_id

      t.timestamps
    end

    add_index :user_tasks, :user_id
    add_index :user_tasks, :task_id
  end
end
