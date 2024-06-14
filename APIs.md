# API Documentation

## Login Service

### POST /api/v1/login

Authenticate a user and generate a session token.

#### Request Body

```json
{
  "email": "user@example.com"
}
```

#### Response

```json
{
  "status": "success",
  "message": "Login Successfull",
  "data": {
    "token": "SESSION_TOKEN"
  }
}
```

## Reservation Service

### POST /api/v1/seat/reserve

#### Authentication

Session Token

#### Request body

```json
{
  "seatNumber": 12,
  "passengerName": "Random Person",
  "passengerAge": 25,
  "passengerPhone": "123459"
}
```

#### Response

1. 200 OK

```json
{
  "status": "success",
  "message": "Seat reserved successfully",
  "data": null
}
```

1. 400 Bad Request

```json
{
  "status": "error",
  "message": "Seat already reserved or processing. Please try another seat.",
  "error": null
}
```

### POST /api/v1/seat/reset

#### Authentication

Session Token for admin email

#### Response

1. 200 OK

```json
{
  "status": "success",
  "message": "Reservation reset successfully",
  "data": null
}
```

2. Forbidden

```json
{
  "message": "Forbidden"
}
```
