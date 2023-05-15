![baner](https://github.com/DudzinskiR/CurrencyHub/assets/130515506/1cbac3a4-9da1-4fc5-af6a-33552bff5961)
[Live demo](https://currencyhub.vercel.app)

## Introduction

CurrencyHub is a comprehensive currency information tool that provides data on currency sessions, currency analysis, and currency pairs for informed decision-making.

## Tech Stack

| Area     | Tech                               |
| -------- | ---------------------------------- |
| Frontend | TypeScript + React.JS + Vercel.com |
| Backend  | TypeScript + NodeJS + Render.com   |
| Database | PostreSQL + Render.com             |
| CI + CD  | GitHub                             |

## Deployment

### Backend

Open your terminal and navigate to the backend

```bash
    cd backend
```

Copy the example environment file to create your own:

```bash
    cp .env.example .env
```

This step is necessary to set up the required environment variables for the backend. Make sure to update the values in the newly created .env file according to your configuration needs.

Here are the environment variables you need to configure in the .env file:

`PORT`: The port number on which the backend server will listen. If not specified, it defaults to `8080`

`DB_HOST`: The host address of your database server.

`DB_PORT`: The port number on which your database server is running.

`DB_DATABASE`: The name of the database you want to use for CurrencyHub.

`DB_USER`: The username to connect to your database.

`DB_PASSWORD`: The password to connect to your database.

Install the required dependencies:

```bash
    npm install
```

Run database migrations:

```bash
    npm run migrate
```

Start the backend server in development mode:

```bash
    npm run dev
```

### Frontend

Open your terminal and navigate to the frontend directory

```bash
    cd frontend
```

(Optional) Copy the example environment file to create your own:

```bash
    cp .env.example .env
```

Install the required dependencies:

```bash
    npm install
```

Start the frontend server:

```bash
    npm start
```

## API Reference

#### Get session data

```
  GET /api/session/?code=${code}
```

This endpoint allows you to retrieve session information for a specific currency.

| Parameter | Type     | Description                                 |
| :-------- | :------- | :------------------------------------------ |
| `code`    | `string` | **Required**. Currency code. Example: `EUR` |

Example response

```
[
    {
        "up": 2,
        "const": 0,
        "down": 2
    },
    //...
]
```

#### Get statistics data

```
  GET /api/statistics/?code=${code}
```

This endpoint allows you to retrieve statistical information for a specific currency.
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `code` | `string` | **Required**. Currency code. Example: `USD` |

Example response

```
[
    {
        "median": 4.5444,
        "mode": [4.4, 4.5],
        "deviation": 0.020094,
        "variation": 0.442659
    },
    //...
]
```

#### Get change distribution data

```
  GET /api/statistics/?one=${one}&two=${two}
```

This endpoint allows you to retrieve the exchange rate change between two currencies.
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `one` | `string` | **Required**. Currency code. Example: `EUR` |
| `two` | `string` | **Required**. Currency code. Example: `USD` |

Example response

```
[
    {
        "scopes": [
            {
                "start": -0.004178,
                "end": -0.002219
            },
            //...
        ],
        "values": [
            28,
            11,
            28,
            17,
            17
        ]
    },
    //...
]
```

## Tests

### Frontend

Open your terminal and navigate to the frontend directory

```bash
    cd frontend
```

Install the required dependencies:

```bash
    npm install
```

Run tests:

```bash
    npm test
```

### Backend

**Note**: Backend testing is performed on a dedicated database created and used only for testing purposes.

Open your terminal and navigate to the backend directory

```bash
    cd backend
```

Install the required dependencies:

```bash
    npm install
```

Run tests:

```bash
    npm run test
```

### E2E - Playwright

Open your terminal and navigate to the playwright directory

```bash
    cd playwright
```

**(Optional)** Copy the example environment file to create your own:

```bash
    cp .env.example .env
```

**Note**: Default values are already set in code

Show the Playwright test report:

```bash
    npx playwright show-report
```

To update snapshots for the tests:

```bash
    npx playwright test --update-snapshots
```

This command will update the snapshots used in the tests. It is useful when the application's UI or behavior has changed, and the tests need to be aligned accordingly.
