#  Rev manifest filter

require 'json'

module Jekyll
  module RevFilter

    @@manifest_path =  "#{Dir.getwd}/jekyll/dist/manifest.json"
    @@asset_base_path = "dist/"

    def rev(asset_path)
      if File.exist?(@@manifest_path)
        self.get_revved_path(asset_path)
      else
        "/#{asset_path}"
      end
    end

    def get_revved_path(asset_path)
      manifest = self.read_json_file(@@manifest_path)
      asset_path = self.clean_asset_path(asset_path)

      manifest.key?(asset_path) ? manifest[asset_path] : asset_path
    end

    def read_json_file(file_name)
      file = File.open(file_name, "r")
      data = file.read
      file.close

      JSON.parse(data)
    end

    def clean_asset_path(asset_path)
      if asset_path.start_with?('/')
        asset_path = asset_path[1..-1]
      end
      if asset_path.start_with?('dist/')
        asset_path.slice!('dist/')
      end

      asset_path
    end
  end
end

Liquid::Template.register_filter(Jekyll::RevFilter)
