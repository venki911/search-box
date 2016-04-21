class AddIndexToQueries < ActiveRecord::Migration
  def change
    change_column :queries, :text, :string
    add_index :queries, :text, unique: true
  end
end
