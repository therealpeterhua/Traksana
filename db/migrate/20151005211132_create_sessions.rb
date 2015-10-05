class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.integer :user_id
      t.string :token

      t.timestamps
    end

    add_index :sessions, :user_id
  end
end
