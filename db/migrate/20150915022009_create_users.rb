class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :name, null: true
      t.string :password_hash, null: false
      t.string :session_token, null: false

      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end
