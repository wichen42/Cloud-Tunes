class AddUserIndexToTracks < ActiveRecord::Migration[7.0]
  def change
    add_reference :tracks, :user, index: true 
  end
end
