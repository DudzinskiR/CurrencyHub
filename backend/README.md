![baner_backend](https://github.com/DudzinskiR/CurrencyHub/assets/130515506/a6a87bc6-4819-4c15-93b1-d253f292dfdd)
[Live demo](https://currencyhub.vercel.app)

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

Start the backend server in development mode:

```bash
    npm run dev
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
        "dominant": [4.4, 4.5],
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
