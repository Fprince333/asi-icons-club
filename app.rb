require 'rubygems'
require 'sinatra'
require 'sinatra/cross_origin'
require 'dotenv'
require 'ruby-pardot'
require 'woocommerce_api'
require 'google/apis/analytics_v3'
require 'googleauth'
require 'pry' if development?

Dotenv.load

configure do
  enable :cross_origin
  set :email, ENV['EMAIL']
  set :password, ENV['PASSWORD']
  set :user_key, ENV['USER_KEY']
end

before do 
  response.headers['Access-Control-Allow-Origin'] = '*'
end

get '/analytics' do 
  scope = 'https://www.googleapis.com/auth/analytics.readonly'
  authorizer = Google::Auth::ServiceAccountCredentials.make_creds(
    json_key_io: File.open('./lib/credentials.json'),
    scope: scope)
  authorizer.fetch_access_token!
  analytics = Google::Apis::AnalyticsV3::AnalyticsService.new
  analytics.authorization = authorizer.access_token
  dimensions = %w(ga:date)
  metrics = %w(ga:sessions ga:users ga:newUsers ga:percentNewSessions ga:sessionDuration ga:avgSessionDuration)
  sort = %w(ga:date)
  results = analytics.get_ga_data("ga:155410770", Date.new(2017, 8, 1).to_time.to_s[0..9], Time.now.to_s[0..9], metrics.join(','), dimensions: dimensions.join(','), sort: sort.join(','))
  results.to_json
end

get '/members' do
  client = Pardot::Client.new settings.email, settings.password, settings.user_key 
  client.format = "full"
  client.authenticate
  client.prospects.query(:list_id => "80205").to_json
end

get '/orders' do 
  woocommerce = WooCommerce::API.new(
    "http://iconsclub.archsystems.com",
    "ck_dd9e27db56776f8c193af83947717092c2e47a9e",
    "cs_5b0b8e45741da23433c8213e8f5a337d00ea735b",
    {
      wp_api: true,
      version: "wc/v1"
    }
  )
  response = woocommerce.get "orders"
  {:total_orders => response.length}.to_json
end

options "*" do
  response.headers["Allow"] = "HEAD,GET,PUT,POST,DELETE,OPTIONS"
  response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
  response.headers["Access-Control-Allow-Origin"] = "*"
  200
end