@tracks.each do |track|
  json.set! track.id do
    json.extract! track, :id, :title, :username, :genre, :description, :user_id, :created_at
    json.trackUrl track.track.url
    json.imageUrl track.image.url
  end
end