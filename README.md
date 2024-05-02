<!-- PROJECT LOGO -->
<p align="center">
   <img src="https://github.com/ParamBirje/noburncloud/assets/87022870/ca5583c2-db8c-4556-8576-11b934df5393.png" alt="Logo">

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

### 🐳 Docker
#### Pre-requisites

- Ensure you have [Docker Engine and Docker Compose v2](https://docs.docker.com/compose/install/) installed and the engine is running.

#### App Setup

Let's start with the steps for setting up the project.

- Clone the repo to your local system

```
git clone https://github.com/ParamBirje/noburncloud.git
```

- Change working directory to the project's root `cd noburncloud`

- Locate the `.env.example` in the project's root directory and make a copy of it as a `.env` file. Use your Gemini AI API key and assign it to the environment variable in the `.env` file.

```
GEMINI_API=API_KEY_HERE
```

- Inside the project root directory, run this command:

```
docker compose --env-file .env up --build
```

- That's it! Great job!
  You can now access the app in your browser on [http://localhost:3000](http://localhost:3000/)

### ⚙️ Manual
#### Pre-requisites

- [Node v20.12 or above](https://nodejs.org/en/download) (comes with package manager `npm`)

#### App Setup

Let's start with the steps for setting up the project.

- Clone the repo to your local system

```
git clone https://github.com/ParamBirje/noburncloud.git
```

- Change working directory to the project's root `cd noburncloud`

##### Backend Server (Express + Websockets)
- Change your working directory to `/apps/api` and run
```
npm install
```

- Locate the `.env.example` in the same directory and make a copy of it as a `.env` file. Use your Gemini AI API key and assign it to the environment variable in the `.env` file.
```
GEMINI_API=API_KEY_HERE
```

- Now run the following command to make a build version.
```
npm run build
```

- We now run the build version using,
```
npm start
```

The backend server is now running on [http://localhost:5001](http://localhost:5001)! Let's start setting up our frontend now.

##### Frontend (Next.js)
- In a new terminal session, Change your working directory to `/apps/web` and run
```
npm install
```

- Locate the `.env.example` in the same directory and make a copy of it as a `.env` file. No edits are needed here as we are using the defaults.

- Now run the following command to make a build version.
```
npm run build
```

- We now run the build version using,
```
npm start
```

- Great job!
  You can now access the app in your browser on [http://localhost:3000](http://localhost:3000/)

#### Additional
If you will be running `npm run dev` for the Next.js app (which runs on http://localhost:3002), remember to change the `/apps/api/.env` file and change the following variable.
```
# Set this according to what URL the Next.js app is running on

ALLOWED_ORIGIN=http://localhost:3002
```
> Default of `ALLOWED_ORIGIN` is set to `http://localhost:3000` which is what the build version of Next.js uses.
