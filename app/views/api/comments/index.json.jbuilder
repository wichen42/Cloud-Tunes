@comments.each do |comment|
    json.set! comment.id do 
        json.extract! comment, :id, :user_id, :track_id, :body
    end
end