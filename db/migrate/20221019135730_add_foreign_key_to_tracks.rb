class AddForeignKeyToTracks < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :tracks, :users
  end
end
