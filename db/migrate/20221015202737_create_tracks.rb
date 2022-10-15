class CreateTracks < ActiveRecord::Migration[7.0]
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.string :username, null: false
      t.string :genre, null: false
      t.string :description, null: false

      t.timestamps
    end
  end
end
