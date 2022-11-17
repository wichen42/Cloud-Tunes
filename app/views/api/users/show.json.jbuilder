json.extract! @user, :id, :username, :created_at, :updated_at, :about, :location
json.imageURL @user.image.url
json.bannerURL @user.banner.url 
