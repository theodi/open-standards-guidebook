# Open Standards Guidebook

## Table of Contents

* [Technologies / dependencies](#technologies--dependencies)
 * [Built with](#built-with)
 * [Front end:](#front-end)
 * [Linting](#linting)
 * [Deployment](#deployment)
* [Prerequisites:](#prerequisites)
* [Project setup](#project-setup)
* [Design Tokens](#design-tokens)
* [Component-centred design and the Fractal living styleguide](#component-centred-design-and-the-fractal-living-styleguide)
* [Search integration](#search-integration)
* [Commands](#commands)
 * [Run dev server](#run-dev-server)
 * [Building for production](#building-for-production)
 * [Building the living styleguide to static HTML](#building-the-living-styleguide-to-static-html)
 * [Secondary tasks](#secondary-tasks)
 * [Linting](#linting-1)
    * [Building styleguide as static HTML](#building-styleguide-as-static-html)
    * [Check HTML links (WIP)](#check-html-links-wip)
* [Hosting, release and deployment](#hosting-release-and-deployment)
 * [Hosting](#hosting)
 * [Creating a new release](#creating-a-new-release)
 * [Deployment](#deployment-1)
* [Project structure](#project-structure)
* [Configuration](#configuration)
 * [Jekyll](#jekyll)
 * [Vue CLI](#vue-cli)
* [Hacks](#hacks)
* [Other useful bits](#other-useful-bits)

## Technologies / dependencies

### Built with

- [Jekyll](https://jekyllrb.com) - static site generator
- [Vue CLI](https://cli.vuejs.org/) - webpack-based build process
- [Fractal](https://fractal.build/) Living styleguide
- [git flow](http://nvie.com/posts/a-successful-git-branching-model/) as a branching methodology
- [Theo](https://github.com/salesforce-ux/theo) for managing [Design Tokens](https://uxdesign.cc/design-tokens-for-dummies-8acebf010d71)

### Front end:

- [Sass](http://sass-lang.com/) for stylesheets (compiled with node-sass)
- [Babel](https://babeljs.io/) for JS transpilation

### Linting

- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Stylelint](https://stylelint.io/)

Linting is enforced on a pre-push hook via [Husky](https://github.com/typicode/husky). This can be disabled / modified via `package.json`

### Deployment

- Deployed and hosted with [Netlify](https://www.netlify.com/)

## Prerequisites:

- [NodeJS runtime](https://nodejs.org/en/) - ~10.x.x LTS release:
- [Yarn](https://yarnpkg.com/en/docs/install#windows-tab)
- [Ruby 2.3.0](https://www.ruby-lang.org/en/documentation/installation/) or greater
- [bundler](https://bundler.io/)
- [git-flow](https://github.com/nvie/gitflow) extensions (only required for release)

## Project setup

```shell
git clone git@github.com:theodi/open-standards-guidebook.git
cd open-standards-guidebook
cp .env.example .env
```
Now populate Algolia environment variables in `.env` [see Deployment](#deployment-1), then


```shell
yarn install
bundle install --path vendor/bundle
yarn serve
```

## Design Tokens

This project uses [Design Tokens](https://uxdesign.cc/design-tokens-for-dummies-8acebf010d71) to manage shared values such as colours, font families, breakpoints and other size values, so that they can be shared easily accross projects and formats ((S)css, JS) while maintaining a single source of truth.

That single source of truth is held in Design Token files ([spec](https://github.com/salesforce-ux/theo#spec)) in the `design/` directory.

The project uses the YAML formatting option for its design tokens for both ease of use and consistency with Jekyll metadata

## Component-centred design and the Fractal living styleguide

This project takes a [component-based approach](https://www.uxpin.com/studio/design-systems/create-component-based-websites-with-design-systems/) to its design and development. Components are located in the `assets/styles` directory and are documented using the [Fractal](https://fractal.build/) living styleguide tool.

Components are implemented in Fractal in the first instance, using the styleguide as a "workbench" to develop and test components and content scenarios for them before they are integrated into the Jekyll site.

**NB** As a Liquid templating adaptor was not available for Fractal at the time of development, the Fractal templates are written using the very similar **but not identical** [Twig templating language](https://github.com/twigjs/twig.js/wiki)

## Search integration

Search is provided via [Algolia](https://www.algolia.com/), using [jekyll-algolia](https://community.algolia.com/jekyll-algolia/) to index the site at build time in Netlify, and Algolia's [vue-instantsearch](https://github.com/algolia/vue-instantsearch) library to build the reactive JS search UI. Because of the static nature of the site, there is no fallback search for users without JavaScript.

## Commands

All commands are via node package scripts.


### Run dev server

```
yarn serve
```

This command does several things concurrently:

- Starts jekyll server with `JEKYLL_ENV=development bundle exec jekyll serve --config _config.yml,_config.dev.yml` on `localhost:4000`
- Starts a vue-cli / webpack asset server on a port defined in `package.json` under  `buildConfig.ports.assets`
- Starts the Fractal styleguide on a port defined in `package.json` under  `buildConfig.ports.assets`


You can run/debug each of these tasks separately via:

```
yarn serve:jekyll
yarn serve:assets
yarn serve:fractal
```

(the top level `yarn serve` task runs each of these tasks concurrently with one another)


### Building for production

```
yarn build
```

- Compiles the design tokens via Theo
- Builds the revved assets via `yarn build:assets`
- Builds  the Jeykll site via  `yarn build:jekyll` / `JEKYLL_ENV='production' bundle exec jekyll build`

The built site is output to `dist/`, which is used as the web root directory on deployment


You can run/debug each of these tasks separately via:

```
yarn build:design-tokens
yarn build:assets
yarn build:jekyll
```

### Building the living styleguide to static HTML

You can compile the Fractal styleguide to static HTML via

```
yarn build:fractal
```

This will build the styleguide to a `styleguide/` directory in the project root

### Secondary tasks

### Linting

Linting (via `yarn lint`) is enforced on a pre-push hook via [Husky](https://github.com/typicode/husky). This can be disabled / modified via the `husky` key in `package.json`.

JS files are also linted at Babel compile time via `eslint-friendly-formatter`.

The following tasks are available for your manual linting requirements:
```
yarn lint:styles
yarn lint:js
yarn lint:html
yarn lint # all the things

```


#### Building styleguide as static HTML

```
yarn build:fractal
```

This builds the Fractal styleguide to static HTML and outputs it to a `styleguide/` directory (gitignored) in the project root.


#### Check HTML links (WIP)

```
yarn lint:html
```

This runs [html-proofer](https://github.com/gjtorikian/html-proofer) with options configured via a [rake task](./Rakefile).

This task is currently designed to be run locally (i.e. not in CI)

Because we're currently deploying the site to a subdirectory, it also requires some temporary changes to `_config.yml` or it will throw a large number of false positives:

Required:

- comment out the `url` and `baseurl` keys. This is required so that Jekyll writes out links in a way that html-proofer can resolve. This can probably be worked around using html-proofer's `url_swap` feature, but we have not currently got that working correctly.

Optional:

- Change `env` to `development` (not required but will disable html minification making the build _much_ faster)




## Hosting, release and deployment


### Hosting

The site is hosted on [Netlify](https://www.netlify.com/), and is configured to build automatically on push to the `master` branch of the GitHub repo, via the Netlify GH app.


### Creating a new release

A release script is included for convenience. Use a [semver](https://semver.org/) compliant version.

```
yarn project:release
```

This will:

- Prompt for the release type
- Create a new release branch from `develop`
- Bump the `version` key in `package.json` and commit it
- Merge back into `develop` and `master`
- Tag the release
- Push the release and tag to `origin/master`

**NB** Release script requires [`git-flow`](https://github.com/nvie/gitflow) cli to be installed locally.

### Deployment

[Netlify](https://www.netlify.com/) is configured to automatically build the site on push to the `master` branch of the GitHub repo, via the Netlify GH app.

An environment variable of `JEKYLL_ENV=production` is set via the Netlify web UI in order to trigger Jekyll to use the production configuration when building the static pages for the site.

Additionally the following environment variables are set to enable the Algolia integration:

```
ALGOLIA_API_KEY
ALGOLIA_APPLICATION_ID
ALGOLIA_INDEX_NAME
ALGOLIA_SEARCH_API_KEY
```

Values for all these can be found in the Algolia dashboard under API keys, with the exception of the Application ID, which is listed in the sidebar of the Algolia UI.


The command run by netlify is:

```
yarn build && yarn algolia:index
```

Which unpacks to:

```shell
yarn build:design-tokens # Compile the abstract design tokens to scss/json
yarn build:assets # Build the Image, CSS and JS assets for the site via webpack / Vue CLI
yarn build:jekyll # Build the site's HTML via Jekyll
yarn algolia:index # index the built site in Algolia
```


## Project structure


```

├── _config.dev.yml # Jekyll dev config - loaded in addition to _config.yml
├── _config.yml # Main Jekyll config
├── _templates/ # Generator templates for front end components - ignore!
├── assets/ # Front end assets - consumed by build process
│   ├── styles/ # Components for Fractal styleguide
│   ├── images/ # images - filenames will be revved on build so use rev filter in liquid
│   ├── js/ # JavaScript goes here, use ES6 as transpiled with webpack
│   └── docs/ # Markdown formatted documentation for Fractal styleguide
│
├── dist/ # Built site goes here
│
├── jekyll/ # The Jekyll part of the project
│   ├── _data/ # Data files in yml, primarily used for nav generation
│   ├── _includes/
│   ├── _layouts/
│   ├── _plugins/ # Custom plugins - currently just rev_filter for asset manifest parsing
│   ├── _templates/
│   ├── about/ # site content
│   ├── assets/ # Output dest for blendid build - ignored in git
│   ├── community/ # site content
│   ├── creating-impact/ # site content
│   ├── creating-open-standards/ # site content
│   ├── find-existing-standards/ # site content
│   ├── guide/ # site content
│   ├── index.md # Homepage
│   └── introduction /# site content
```
(Some files / dirs removed above for clarity)


## Configuration

### Jekyll

See inline documentation in `_config.yml` / `_config.dev.yml` for details.

Additionally, We are using the following Jekyll third-party plugins, auto installed via the `:jekyll_plugins` group in `Gemfile`.

- jekyll-git_metadata - Git metadata for last edited dates on oages
- octopress-minify-html - Minifies HTML on build only
- jekyll-sitemap - XML sitemap generator
- jekyll-seo-tag - SEO metadata generation

We also have the following custom Jekyll plugins (in `jekyll/_plugins`)

- env_vars.rb - exposes environent variables (inc from `.env`) to Jekyll
- rev_filter.rb - supports revving asset file names via a manifest.json file output by the asset build process

### Vue CLI

The asset build process is configured / customised via the `vue.config.js` in the project root.

## Hacks

- The `jekyll-git_metadata` is monkey patched in `src/_plugins/git_metadata.rb` to handle the fact that we're running Jekyll in a subdirectory of the project

## Other useful bits

- Regenerate the table of content for this README.md (or any other) by running `yarn docs:toc` and pasting in the output
