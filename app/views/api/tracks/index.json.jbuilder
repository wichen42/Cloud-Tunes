json.array! @tracks do |track|
    json.extract! track, :id, :title, :username, :genre, :description
    json.trackUrl track.audio.url
  end