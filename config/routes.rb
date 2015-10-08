Rails.application.routes.draw do
  root to: "static_pages#root"
  get '/hello', to: 'sessions#new'
  get 'auth/:provider/callback', to: 'sessions#omniauth'

  resources :users, only: [:new, :create]
  resources :sessions, only: [:new, :create, :destroy] do
    collection do
      post 'sign_in_guest'
      get 'check_credentials'
    end
  end

  namespace :api, defaults: { format: :json } do
    resources :teams, only: [:index, :create, :show] do
      member do
        post 'assign_members'
      end
    end

    resources :users, except: [:new, :create] do
      collection do
        get 'current_user_info'
        get 'search'
      end
    end

    resources :projects, only: [:create, :update, :destroy]

    resources :tasks, only: [:create, :update, :destroy, :show] do
      member do
        post 'toggle_completion'
        post 'edit_assigned_users'
        get 'fetch_comments'
      end
    end

    resources :comments, only: [:create, :destroy]

  end
end
