json.array! @posts do |post|
  json.extract! post, :id, :title
  json.photoUrl post.photo.url
end