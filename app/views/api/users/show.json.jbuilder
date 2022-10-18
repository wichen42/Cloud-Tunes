json.user do
    json.extract! @user, :id, :username, :created_at, :updated_at, :image_url, :banner_url
  end