require 'rubygems'
require 'sinatra'
require 'sinatra/cross_origin'
require 'dotenv'
require 'ruby-pardot'
require 'pry' if development?
require 'woocommerce_api'

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