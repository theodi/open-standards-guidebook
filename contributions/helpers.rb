
module Contributions
  module Helpers
    def repo
      ENV['GITHUB_REPO']
    end

    def token
      ENV['GITHUB_TOKEN']
    end

    def client
      @client ||= Octokit::Client.new access_token: token
    end

    def issue_title
      params['title']
    end

    def issue_body
      params.reject { |key, value| key == 'title' || value.empty? || key == 'labels' || value.is_a?(Hash) }.map { |key, value| "* **#{key.humanize}**: #{value}" }.join("\n")
    end

    # # abstraction to allow cached form data to be used in place of default params
    # def params
    #   session['params'].nil? ? params : JSON.parse(session['params'])
    # end

    def labels
      params['labels'].join(',') if params['labels']
    end

    def uploads
      params.select do |_key, value|
        value.is_a?(Hash) && value.key?(:tempfile) && value[:tempfile].is_a?(Tempfile)
      end
    end

    def create_issue
      issue = client.create_issue(repo, params['title'], issue_body, labels: labels)
      issue['number'] if issue
    end


    # Returns array of Octokit branch objects
    def branches
      client.branches(repo)
    end

    # Head SHA of default branch, used for creating new branches
    def base_sha
      default_branch = client.repo(repo)[:default_branch]
      branches.find { |branch| branch[:name] == default_branch }[:commit][:sha]
    end

    def branch_exists?(branch)
      branches.any? { |b| b.name == branch }
    end

    # Name of branch to submit pull request from
    # Starts with patch-1 and keeps going until it finds one not taken
    def patch_branch
      num = 1
      branch_name = params['title'].parameterize
      return branch_name unless branch_exists?(branch_name)
      branch = "#{branch_name}-#{num}"
      while branch_exists?(branch)
        num += 1
        branch = "#{branch_name}-#{num}"
      end
      branch
    end

    # Create a branch with the given name, based off of HEAD of the defautl branch
    def create_branch(branch)
      client.create_ref repo, "heads/#{branch}", base_sha
    end

    # Create a pull request with the form contents
    def create_pull_request
      unless uploads.empty?
        branch = patch_branch
        create_branch(branch)
        uploads.each do |key, upload|
          client.create_contents(
            repo,
            upload[:filename],
            "Create #{upload[:filename]}",
            branch: branch,
            file: upload[:tempfile]
          )
          session["file_#{key}"] = nil
        end
      end
      pr = client.create_pull_request(repo, 'master', branch, params['title'], issue_body, labels: labels)
      pr['number'] if pr
    end
  end
end
