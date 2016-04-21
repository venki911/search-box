class CreateQueries < ActiveRecord::Migration
  def change
    create_table :queries do |t|
      t.string :text,
      t.integer :count

      t.timestamps null: false
    end
  end
end
