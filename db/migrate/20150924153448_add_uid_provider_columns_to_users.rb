class AddUidProviderColumnsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :uid, :string, null: true
    add_column :users, :provider, :string, null: true

    add_index :users, [:uid, :provider], unique: true
  end
end
