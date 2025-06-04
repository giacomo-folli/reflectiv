<p align="center">
   <img alt="Logo" width="150px" src="https://raw.githubusercontent.com/giacomo-folli/reflectiv/refs/heads/main/static/generated-icon.png" />
</p>

<h1 align="center">reflectiv</h1>

<p align="center">
<a href="https://github.com/giacomo-folli/reflectiv/actions/workflows/build-and-push.yml">
  <img src="https://github.com/giacomo-folli/reflectiv/actions/workflows/build-and-push.yml/badge.svg" alt="CI">
</a>
<a href="https://raw.githubusercontent.com/giacomo-folli/reflectiv/refs/heads/master/LICENSE"><img src="https://img.shields.io/github/license/giacomo-folli/reflectiv?color=428f7e&logo=open%20source%20initiative&logoColor=white" alt="License"></a>
<a href="https://hub.docker.com/r/giacomofolli/reflectiv"><img src="https://img.shields.io/docker/image-size/giacomofolli/reflectiv" alt="Docker Image Size"></a>
<a href="https://hub.docker.com/r/giacomofolli/reflectiv"><img src="https://img.shields.io/docker/pulls/giacomofolli/reflectiv" alt="Docker pulls"></a>
<a href="https://hub.docker.com/r/giacomofolli/reflectiv"><img src="https://img.shields.io/docker/v/giacomofolli/reflectiv?sort=semver" alt="Docker version"></a>
</p>

---

<h4 align="center">reflectiv is an open source app to help you generate monthly PDF reflection diaries with AI from chatGPT chats.</h4>

<p align="center">
  <a href="#%EF%B8%8F-disclaimer">Disclaimer</a> •
  <a href="#-wiki">Wiki</a> •
  <a href="#-prerequisites">Prerequisites</a> •
  <a href="#%EF%B8%8F-installation">Installation</a> •
  <a href="#%EF%B8%8F-sponsors">Sponsors</a>
</p>

<!-- <p align="center">
  <a href="https://www.buymeacoffee.com/ingelbrecht" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;" ></a>
</p> -->

### Key Features

- TODO

## ⚠️ Disclaimer

This project is a personal reflection tool, **not a substitute for professional help**. If you're struggling, please consider reaching out to a counselor, therapist, or a trusted friend. You're not alone.

## 📚 Wiki

Read [the wiki](https://github.com/giacomo-folli/reflectiv/wiki) before opening new issues. The question you have might be answered over there.

## 🪄 Prerequisites

You'll need a `Strava client ID` and `Strava client Secret`

- Navigate to your [Strava API settings page](https://www.strava.com/settings/api).
- Copy the `client ID` and `client secret`, you'll need these during the [installation](#%EF%B8%8F-installation)
- Make sure the `Authorization App Domain` is set to the url you will host your app on. By default this should be `http://localhost:8080`

## 🛠️ Installation

> [!NOTE]
> To run this application, you'll need [Docker](https://docs.docker.com/engine/install/) with [docker-compose](https://docs.docker.com/compose/install/).

Start off by showing some ❤️ and give this repo a star. Then from your command line:

```bash
# Create a new directory
> mkdir reflectiv
> cd reflectiv

# Create docker-compose.yml and copy the example contents into it
> touch docker-compose.yml
> nano docker-compose.yml

# Create .env and copy the example contents into it. Configure as you see fit
> touch .env
> nano .env
```

### docker-compose.yml

```yml
services:
  app:
    image: ghcr.io/giacomo-folli/reflectiv:latest
    container_name: reflectiv
    ports:
      - "3000:3000"
    env_file:
      - .env
    environment:
      - NODE_ENV=production
      - DATA_DIR=/home/node/app/data
    volumes:
      - reflectiv_data:/home/node/app/data
    restart: unless-stopped

volumes:
  reflectiv_data:
```

### .env

> [!IMPORTANT]
> Every time you change the .env file, you need to restart your container for the changes to take effect.

```bash
> curl -o .env https://raw.githubusercontent.com/giacomo-folli/reflectiv/main/.env.example
> nano .env
```

### Running the Application

To run the application run the following command:

```bash
> docker compose up -d
```

The docker container is now running; navigate to `http://localhost:3000/` to access the app.

> [!IMPORTANT]
> Make sure to edit the `.env` file to include your `Strava client ID` and `Strava client Secret`

## 🗺️ Locales and translations

Currently, the app is translated to:

- 🇬🇧 English
- 🇮🇹 Italian

If you want to see a new locale added, please open an issue

<!-- [open a new issue](https://github.com/robiningelbrecht/statistics-for-strava/issues/new?template=translations-and-localisation.md).  -->

Only do this if you are willing to help on the actual translation 🙃.

## 💡 Feature request?

For any feedback, help or feature requests, please [open a new issue](https://github.com/robiningelbrecht/statistics-for-strava/issues/new/choose).
Before you do, please read [the wiki](https://github.com/robiningelbrecht/statistics-for-strava/wiki). The question you have might be answered over there.

## 🛠️ Local setup

Run the following commands to setup the project on your local machine

```bash
> git clone git@github.com:your-name/your-fork.git
> npm i
> npm run dev
```

<!-- ## ❤️ Sponsors -->
