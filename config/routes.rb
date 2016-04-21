Rails.application.routes.draw do
  # Angular App route
  root 'home#index'

  # API Routes
  scope :api do
    post 'query/suggestions' => 'query#suggestions'
    post 'query' => 'query#search'
    get 'query' => 'query#all_searches'
    delete 'query' => 'query#reset_queries'
  end
end
