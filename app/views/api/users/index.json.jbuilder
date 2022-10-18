@users.each do |user|
    json.set! user.id do
        json.extract! user, :id, :username, :created_at, :updated_at, :image_url, :banner_url, :about, :location
    end
end
