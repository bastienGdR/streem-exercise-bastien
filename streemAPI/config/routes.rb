Rails.application.routes.draw do
  get '/news/search_news', to: 'news#search_news'
end
