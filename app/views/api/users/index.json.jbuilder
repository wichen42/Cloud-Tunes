@users.each do |user|
    json.set! user.id do
        json.extract! user, :id, :username, :created_at, :updated_at, :image_url, :banner_url, :about, :location
        json.profileUrl user.image.url
        json.bannerURL user.banner.url
    end
end
