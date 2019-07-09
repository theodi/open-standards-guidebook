# Open Standards Guidebook

## Table of Contents

* [Table of Contents](#table-of-contents)
* [Technologies / dependencies](#technologies--dependencies)
  * [Built with](#built-with)
  * [Front end:](#front-end)
  * [Linting](#linting)
  * [Deployment](#deployment)
* [Prerequisties:](#prerequisties)
* [Project setup](#project-setup)
* [Commands](#commands)
  * [Run dev server](#run-dev-server)
  * [Building for production](#building-for-production)
  * [Secondary tasks](#secondary-tasks)
  * [Linting](#linting-1)
    * [Building styleguide as static HTML](#building-styleguide-as-static-html)
    * [Check HTML links (WIP)](#check-html-links-wip)
* [Release and deployment](#release-and-deployment)
* [Project structure](#project-structure)
* [Configuration](#configuration)
  * [Jekyll](#jekyll)
  * [Vue CLI](#vue-cli)
* [Contributions application](#contributions-application)
* [Hacks](#hacks)
* [Other useful bits](#other-useful-bits)

## Technologies / dependencies

### Built with

- [Jekyll](https://jekyllrb.com) - static site generator
- [Vue CLI](https://cli.vuejs.org/) - webpack-based build process
- [Fractal](https://fractal.build/) Living styleguide
- [git flow](http://nvie.com/posts/a-successful-git-branching-model/) as a branching methodology

### Front end:

- [Sass](http://sass-lang.com/) for stylesheets (compiled with node-sass)
- [Babel](https://babeljs.io/) for JS transpilation

### Linting

- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Stylelint](https://stylelint.io/)

Linting is enforced on a pre-push hook via [Husky](https://github.com/typicode/husky). This can be disabled / modified via `package.json`

### Deployment

- Deployed with [TravisCI](https://travis-ci.org/)
- Hosted on [GH Pages](https://pages.github.com/)

## Prerequisties:

- [NodeJS runtime](https://nodejs.org/en/) - ~8.9.3 LTS release:
- [Yarn](https://yarnpkg.com/en/docs/install#windows-tab)
- [Ruby 2.3.0](https://www.ruby-lang.org/en/documentation/installation/) or greater
- [bundler](https://bundler.io/)
- [git-flow](https://github.com/nvie/gitflow) extensions (only required for release)

## Project setup

```
git clone git@github.com:theodi/open-standards-guidebook.git
cd open-standards-guidebook
cp .env.example .env
yarn install
bundle install --path vendor/bundle
yarn serve
```

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


### Building for production

```
yarn build
```

- Builds the revved assets via `yarn build:assets`
- Builds  the Jeykll site via  `yarn build:jekyll` / `JEKYLL_ENV='production' bundle exec jekyll build`
- The built site is output to `dist/`


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




## Release and deployment

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
├── contributions/ # Sinatra app, handles creating GH issue from form submissions
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

## Contributions application

The `contributions/` directory contains a small [Sinatra](http://sinatrarb.com) application that takes form submissions and turns them into issues / PRs on the GitHub repo via the GH api. For full details of this component of the project see [`contributions/README.md`](blob/develop/contributions/README.md).

## Hacks

- The `jekyll-git_metadata` is monkey patched in `src/_plugins/git_metadata.rb` to handle the fact that we're running Jekyll in a subdirectory of the project

## Other useful bits

- Regenerate the table of content for this README.md (or any other) by running `yarn docs:toc` and pasting in the output
