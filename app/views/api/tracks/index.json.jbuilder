@tracks.each do |track|
  json.set! track.id do
    json.extract! track, :id, :title, :username, :genre, :description, :user_id
    json.trackUrl track.track.url
  end
end