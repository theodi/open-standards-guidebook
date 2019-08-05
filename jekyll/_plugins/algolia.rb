require 'active_support/all'

module Jekyll
  module Algolia
    module Hooks
      def self.before_indexing_each(record, node, context)

        clean_record = ActiveSupport::HashWithIndifferentAccess.new(record)

        clean_record.except(:tasklists, :sidebar);
      end
    end
  end
end
