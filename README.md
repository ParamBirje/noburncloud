<!-- PROJECT LOGO -->
<p align="center">
  <a href="https://github.com">
   <img src="https://github.com/ParamBirje/JobsAhoy/assets/87022870/6171210e-21bb-45e9-9b72-c286ba79af01.jpg" alt="Logo">
  </a>

  <h3 align="center">NoBurnCloud</h3>

  <p align="center">
    Build better cloud architectures without the unexpected costs.
  </p>
</p>

<!-- ABOUT THE PROJECT -->

## About the Project

NBC simulates the idea of having your app deployed on the cloud with lifelike users and problems. It would help you get a general idea of how the environment would be in a real world scenario, where you could get product updates to expand your architecture or would be bombarded with real world cloud failures and how it would affect your product's performance (business-wise). All packed into a single app, powered by AI.

It helps you prepare your architecture better by simulating events that will force you to use the best practices for scalability, high-availability, resiliency and security so that your architecture withstands any, well most, vulnerabilities.

## Tech Stack

Built using,

- Next.js
- React.js
- Typescript
- Tailwind CSS
- SocketIO
- ExpressJS
- Jotai

<!-- Setting up the project -->

## Running locally

### Pre-requisites

[Node v20.12 or above](https://nodejs.org/en/download) (comes with package manager `npm`)
Ensure you have [Docker Engine and Docker Compose v2](https://docs.docker.com/compose/install/) installed and the engine is running.

### App Setup

Let's start with the steps for setting up the project.

- Clone the repo to your local system

```
git clone https://github.com/ParamBirje/noburncloud.git
```

- Locate the `.env.example` in the project's root directory and make a copy of it as a `.env` file. Use your Gemini AI API key and assign it to the environment variable.

```
GEMINI_API=API_KEY_HERE
```

- Inside the root directory, run this command:

```
docker compose --env-file .env up --build
```

- That's it! Great job!
  You can now access the app in your browser on [http://localhost:3000](http://localhost:3000/)
