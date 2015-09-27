Rails.application.routes.draw do
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  root to: "static_pages#root"

  get '/hello', to: 'sessions#new'
  get 'auth/:provider/callback', to: 'sessions#omniauth'
  # this routes to the omniauth method in api/sessions_controller.rb

  namespace :api, defaults: { format: :json } do      #PH - why json here? json anyway?
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
    #PH - member routes give you :id, collection routes are whole thing

  end
end

# The priority is based upon order of creation: first created -> highest priority.
# See how all your routes lay out with "rake routes".

# You can have the root of your site routed with "root"
# root 'welcome#index'

# Example of regular route:
#   get 'products/:id' => 'catalog#view'

# Example of named route that can be invoked with purchase_url(id: product.id)
#   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

# Example resource route (maps HTTP verbs to controller actions automatically):
#   resources :products

# Example resource route with options:
#   resources :products do
#     member do
#       get 'short'
#       post 'toggle'
#     end
#
#     collection do
#       get 'sold'
#     end
#   end

# Example resource route with sub-resources:
#   resources :products do
#     resources :comments, :sales
#     resource :seller
#   end

# Example resource route with more complex sub-resources:
#   resources :products do
#     resources :comments
#     resources :sales do
#       get 'recent', on: :collection
#     end
#   end

# Example resource route with concerns:
#   concern :toggleable do
#     post 'toggle'
#   end
#   resources :posts, concerns: :toggleable
#   resources :photos, concerns: :toggleable

# Example resource route within a namespace:
#   namespace :admin do
#     # Directs /admin/products/* to Admin::ProductsController
#     # (app/controllers/admin/products_controller.rb)
#     resources :products
#   end
