json.user do
    json.extract! @user, :id, :username, :created_at, :updated_at, :image_url, :banner_url, :about, :location
    json.imageURL @user.image.url
    json.bannerURL @user.banner.url 
  end