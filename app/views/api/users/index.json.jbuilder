@users.each do |user|
    json.set! user.id do
        json.extract! user, :id, :username, :created_at, :updated_at, :about, :location
        json.profileUrl user.image.url
        json.bannerURL user.banner.url
    end
end
