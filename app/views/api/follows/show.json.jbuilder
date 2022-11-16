json.set! @follow.id do 
    json.extract! @follow, :followed_id, :follower_id
end