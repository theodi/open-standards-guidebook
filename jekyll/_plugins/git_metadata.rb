###
# Monkey patch the git_metadata gem to handle the fact that we're running
# Jekyll in a subdirectory
###
module Jekyll
  module GitMetadata
    class Generator < Jekyll::Generator
      @@path_prefix = 'src/'

      def page_data(relative_path = nil)

        return if relative_path && !tracked_files.include?("#{@@path_prefix}/#{relative_path.to_s}")

        authors = self.authors(relative_path.to_s)
        lines = self.lines(relative_path)

        {
          'authors' => authors,
          'total_commits' => authors.inject(0) { |sum, h| sum += h['commits'] },
          'total_additions' => lines.inject(0) { |sum, h| sum += h['additions'] },
          'total_subtractions' => lines.inject(0) { |sum, h| sum += h['subtractions'] },
          'first_commit' => commit(lines.last['sha']),
          'last_commit' => commit(lines.first['sha'])
        }
      end
    end
  end
end
