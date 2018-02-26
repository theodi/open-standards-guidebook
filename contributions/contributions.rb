require 'octokit'
require 'sinatra'
require 'sinatra/respond_with'
require 'sinatra/strong-params'
require 'sinatra_auth_github'
require 'dotenv'
require 'json'
require 'active_support'
require 'active_support/core_ext/string'
require './helpers'

module Contributions
  def self.root
    File.dirname(__FILE__)
  end

  def self.views_dir
    @views_dir ||= File.expand_path 'views', Contributions.root
  end

  def self.views_dir=(dir)
    @views_dir = dir
  end

  def self.public_dir
    @public_dir ||= File.expand_path 'public', Contributions.root
  end

  def self.public_dir=(dir)
    @public_dir = dir
  end

  class App < Sinatra::Base
    register Sinatra::StrongParams
    register Sinatra::RespondWith

    include Contributions::Helpers

    set :github_options, scopes: 'repo,read:org'

    use Rack::Session::Cookie, http_only: true,
                               secret:    ENV['SESSION_SECRET'] || SecureRandom.hex

    configure :production do
      require 'rack-ssl-enforcer'
      use Rack::SslEnforcer
    end


    ENV['WARDEN_GITHUB_VERIFIER_SECRET'] ||= SecureRandom.hex
    register Sinatra::Auth::Github

    set :views, (proc { Contributions.views_dir })
    set :root,  (proc { Contributions.root })
    set :public_folder, (proc { Contributions.public_dir })


    post '/', allows: [:title, :body, :upload, :labels], needs: [:title] do
      response['Access-Control-Allow-Origin'] = ENV['ORIGIN_DOMAIN'] || '*'

      issue = uploads.empty? ? create_issue : create_pull_request

      respond_to do |f|
        f.on('application/json') {
            {
                success: "http://github.com/#{repo}/issues/#{issue}"
            }.to_json
        }
        f.on('text/*') { :success }
      end

    end

  end
end

Dotenv.load unless Contributions::App.production?
