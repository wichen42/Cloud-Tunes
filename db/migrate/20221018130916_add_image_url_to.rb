class AddImageUrlTo < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :banner_url, :string, default: "https://cloud-tunes-dev.s3.amazonaws.com/default-banner.jpg"
  end
end
