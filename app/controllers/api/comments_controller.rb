class Api::CommentsController < ApplicationController
    
    def index
        @comments = Comment.all()
        render :index
    end

    def create
        @comment = Comment.new(comment_params)
        if @comment.save
            render json: {message: "Comment Created"}
        else
            render json: { errors: @comment.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        @comment = Comment.find(params[:id])
        if @comment
            render :index
        else
            render json: { errors: @comment.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        @comment = Comment.find(params[:id])
        if @comment
            @comment.destroy
        else
            render json: { errors: @comment.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def comment_params
        params.require(:comment).permit(:user_id, :track_id, :body)
    end 
  
end