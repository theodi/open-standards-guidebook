## Contributions app

This is a simple [Sinatra](http://sinatrarb.com/) app based on customised version of [Problem Child](https://github.com/benbalter/problem_child/) by [@benbalter](https://github.com/benbalter).

The main changes from the orignal version are:

- Update all dependencies to latest versions
- Refactor routes to support submission from another origin (our Jekyll site) and JSON responses to ajax requests

## Installing

Prerequisites:

- ruby 2.3+
- bundler
- heroku cli

```
bundle install
```

## Config

All config is via enviroment variables

dotenv is used for local development...

```
cp .env.example .env
```

There are three environment variables required:

```
# the repo to open the issue against in the form of owner/repo
GITHUB_REPO='theodi/open-standards-guidebook'

# https://github.com/settings/tokens/new - uses the odi-gitbot account in production
GITHUB_TOKEN=''

# The permitted origin for submitting to the form endpoint
ORIGIN_DOMAIN="http://localhost:3004"
````


## Running locally

```
bundle exec foreman start
```

## Hosting

Hosted on Heroku as `open-standards-guidebook`

## Deployment

There is no build step for this app, just push directly to Heroku

```
# Initialise an empty git repo in the contributions directory (if you don't already have one)
git init
# Add the remote
heroku git:remote -a open-standards-guidebook
# Deploy
git push heroku master
```
