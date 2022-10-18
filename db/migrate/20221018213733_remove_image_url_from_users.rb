class RemoveImageUrlFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :image_url, :string
    remove_column :users, :banner_url, :string
  end
end
