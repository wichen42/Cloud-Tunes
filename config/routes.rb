Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  # test routes
  # post '/api/test/', to: 'application#test'
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update, :index, :destroy] do 
      resources :follows, only: [:create, :destroy]
    end
    resources :follows, only: [:index]
    resource :session, only: [:show, :create, :destroy]
    resources :posts, only: [:index, :show, :create]
    resources :tracks, only: [:create, :index, :destroy] do
      resources :comments, only: [:create]
    end
    resources :comments, only: [:destroy, :update, :index]
  end

  get '*path', to: "static_pages#frontend_index"

end