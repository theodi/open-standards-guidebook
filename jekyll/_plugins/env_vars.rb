#  Use env vars in liquid

module Jekyll
  class EnvironmentVariablesGenerator < Generator
    def generate(site)
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
