# Plugin to add environment variables to the `site` object in Liquid templates
require 'dotenv/load'

module Jekyll
  class EnvironmentVariablesGenerator < Generator
    def generate(site)
      # Load up .env variables.

      site.config['env'] = env_hash

      site.config['isBuild'] = env_hash.key?('JEKYLL_ENV') && env_hash['JEKYLL_ENV']  == 'production'

      print "loaded dotenv variables. Production mode: #{site.config['isBuild']}"
    end

    def env_hash
      env = Hash.new

      ENV.each_pair do |k,v|
        env[k] = v
      end

      env
    end
  end
end
