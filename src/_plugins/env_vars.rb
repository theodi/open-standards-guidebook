#  Use env vars in liquid

module Jekyll
  module EnvVars
    class Generator < Jekyll::Generator

      def generate(site)
        site.config['env_vars'] = env_hash
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
end
