require 'rubygems'
require 'sinatra'
require 'sinatra/cross_origin'
require 'dotenv'
require 'ruby-pardot'
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

get '/members' do
  client = Pardot::Client.new settings.email, settings.password, settings.user_key 
  client.format = "full"
  client.authenticate
  client.prospects.query(:list_id => "80205").to_json
end

options "*" do
  response.headers["Allow"] = "HEAD,GET,PUT,POST,DELETE,OPTIONS"
  response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
  response.headers["Access-Control-Allow-Origin"] = "*"
  200
end