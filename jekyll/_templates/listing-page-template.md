---
# The Page Title
title: Listing Page Example
# Use the listing layout
layout: listing

# The lede text for this page
description: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum

# The following default to true, and only need setting explicitly if you want
# to set them as false
#
# show_toc: false # Show / hide the table of contents
# show_nav: false # Show / hide the section nav in the hero
# show_intro_sentence: false # Show / hide the intro sentence
# intro_sentence: This is a custom intro sentence that will be used in preference to the global one
#   defined in site.data.snippets.intro_sentence

# The Hero contents
hero:
  nav:
    # Nav meta title
    meta: Listing
    # Nav title
    title: Example Listing Page
    # Nav items
    items:
      - introduction/what-are-open-standards-for-data
      - introduction/types-of-open-standards-for-data
      - introduction/when-to-use-open-standards-for-data

# The section listing in the content area
sections:
  items:
  # The type of grid output we want for this section
  - type: grid # full, grid, short
    # Section meta title
    meta: Process
    # Section title
    title: Creating Open Standards
    # Section description
    description: >-
      Short description nulla eu molestie massa. Pellentesque fermentum
      urna pretium nulla lacinia gravida. Aenean in aliquet mauris. Short
      description nulla eu molestie massa. Pellentesque fermentum
      urna pretium nulla lacinia gravida. Aenean in aliquet mauris.
    # Nav items in this section, that autopull url / description from target content
    items:
      - creating-open-standards/getting-started
      - creating-open-standards/developing-standards/index
      - creating-open-standards/managing-change/index
  - type: grid # full, grid, short
    meta: Groups
    title: Open Standards and you
    description: >-
      Short description nulla eu molestie massa. Pellentesque fermentum
      urna pretium nulla lacinia gravida. Aenean in aliquet mauris. Short
      description nulla eu molestie massa. Pellentesque fermentum
      urna pretium nulla lacinia gravida. Aenean in aliquet mauris.
    # Nav items in this section, that are manually defined
    items:
      # Item title
      - title: Organisations developing standards
        # Item URL
        url: '#'
        # Item description
        description: >-
          Short description nulla eu molestie massa. Pellentesque fermentum urna pretium nulla lacinia gravida. Aenean in aliquet mauris.
      - title: Policy specialists
        url: '#'
        description: >-
          Short description nulla eu molestie massa. Pellentesque fermentum urna pretium nulla lacinia gravida. Aenean in aliquet mauris.
      - title: Domain experts
        url: '#'
        description: >-
         Short description nulla eu molestie massa. Pellentesque fermentum urna pretium nulla lacinia gravida. Aenean in aliquet mauris.
      - title: Data publishers and consumers
        url: '#'
        description: >-
         Short description nulla eu molestie massa. Pellentesque fermentum urna pretium nulla lacinia gravida. Aenean in aliquet mauris.
---
