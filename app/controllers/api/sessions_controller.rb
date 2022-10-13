class Api::SessionsController < ApplicationController
  def show
    if current_user
      @user = current_user
      # render json: @user
      render 'api/users/show'
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_credentials(params[:username], params[:password])

    if @user
      login!(@user)
      # render json: @user
      render 'api/users/show'
    else
      render json: { errors: ['Invalid Username or Password']}, status: :unauthorized
    end
  end

  def destroy
    logout!
    render json: { message: 'Logout Success'}
  end
end
