require 'elasticsearch'

require_relative '../../config/elasticsearch_config'


class NewsController < ApplicationController
    include NewsHelper

    def search_news
      query = params[:query]
      after = params[:after]
      before = params[:before]
      interval = params[:interval]

      @aggregations = $client.search(index: 'news', body: getQuery(query, after, before, interval)  )
      render json: @aggregations
    end
  end