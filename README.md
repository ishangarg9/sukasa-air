# Sukasa Air

## Running the code

- Create `.env` file at root, add below variables

```
MONGODB_URI=mongodb://localhost:27017/sukasa-air
JWT_SECRET=secret
```

- to run
  - `npm install`
  - `npm run dev`

## code structure

```
sukasa-air/
├── src/
│ ├── controllers/
│ │ ├── authController.ts
│ │ ├── reservationController.ts
│ ├── controllers/
│ │ ├── connectDB.ts
│ ├── middleware/
│ │ ├── authMiddleware.ts
│ │ ├── validationMiddleware.ts
│ │ ├── errorHandler.ts
│ ├── models/
│ │ ├── reservation.ts
│ │ ├── user.ts
│ ├── routes/
│ │ ├── authRoutes.ts
│ │ ├── reservationRoutes.ts
│ ├── services/
│ │ ├── authService.ts
│ │ ├── reservationService.ts
│ ├── tests/
│ │ ├── auth.test.ts
│ │ ├── reservation.test.ts
│ │ ├── tokenParser.test.ts
│ │ ├── db.test.ts
│ ├── types/
│ ├── utils/
│ │ ├── apiHandler.ts
│ │ ├── tokenParser.ts
│ ├── index.ts
├── package.json
├── tsconfig.json
└── jest.config.js
```

## Data Model Descriptions

### Reservation

A reservation is a booking object that stores informatino like passenger name & seat number booked.

### user

Contains information regarding user, email only for current requirement

## API Documentation

[API Documentation](APIs.md)

## Tests

- run `npm run test` to run tests
- run `npm run test:coverage` to get coverage report
- Test Coverage [Report](coverage/lcov-report/index.html)

## Test Coverage Report

![alt md](static/Coverage.png)
