# Copilot Instructions for WSV eCommerce API Project

## Project Architecture & Key Concepts

- **Modular Structure:**
  - All business logic is organized by domain in `src/` (auth, controllers, models, services, routes, middlewares, helpers, configs).
  - Entry point is `server.js`, which loads `src/app.js` and wires up Express, MongoDB, error handling, and routes.

- **Authentication & Authorization:**
  - API endpoints are protected by both API Key (`x-api-key` header, checked in `src/auth/checkAuth.js`) and JWT token (`authorization` header, checked in `src/auth/authUtils.js`).
  - JWT tokens use RS256 and are managed via `KeyTokenService` and `keytoken.model.js`.
  - Refresh tokens are supported via `/shop/refresh-token` endpoint.

- **Product Management:**
  - Product creation uses a **Factory Pattern** (`ProductFactory` in `src/services/product.service.js`) to support multiple product types (Clothing, Electronics, Furniture).
  - Each product type has its own schema and model in `src/models/product.model.js`.
  - To add a new product type, create a new class and register it with `ProductFactory.registerProductType()`.

- **Error Handling:**
  - All errors are handled centrally via `src/middlewares/errorHandler.js` (wired in `app.js`).
  - Custom error classes and standardized response formats are in `src/core/`.

- **Response Convention:**
  - All API responses use `SuccessResponse` or `ErrorResponse` from `src/core/success.response.js` and `src/core/error.response.js`.

## Developer Workflows

- **Start Server:**
  - Use `npm start` (runs with nodemon for auto-reload).
  - Server runs at `http://localhost:3052`.

- **Environment Variables:**
  - Most config is in `src/configs/config.mongodb.js` and optionally `.env` (not required for default local dev).

- **Testing APIs:**
  - Use `.http` files (REST Client for VSCode) or curl for manual API testing.
  - Example curl for product creation:
    ```bash
    curl -X POST http://localhost:3052/v1/api/product/create-product \
      -H "Content-Type: application/json" \
      -H "x-api-key: <API_KEY>" \
      -H "authorization: Bearer <JWT_TOKEN>" \
      -H "x-client-id: <USER_ID>" \
      -d '{"product_name":"Test","product_type":"Electronics","product_attributes":{"manufacturer":"TestBrand","model":"TestModel","color":"white"}}'
    ```

## Project-Specific Patterns & Conventions

- **Async/Await Everywhere:** All controllers/services use async/await and are wrapped with `asyncHandler` from `src/helpers/asyncHandler.js`.
- **Factory Pattern for Extensibility:** New product types should follow the registration pattern in `product.service.js`.
- **API Key & JWT Required:** Most protected endpoints require both API Key and JWT; public endpoints are explicitly marked in `src/routes/index.js`.
- **Error Handling:** Always throw custom error classes from `src/core/error.response.js` for consistent error responses.
- **MongoDB Connection:** Managed in `src/databases/init.mongodb.js`.

## Integration Points & External Dependencies

- **MongoDB:** Main data store, configured in `src/configs/config.mongodb.js`.
- **bcrypt:** Used for password hashing in authentication flows.
- **jsonwebtoken:** Used for access/refresh token creation and validation.
- **nodemon:** Used for development auto-reload.

## Key Files & Directories

- `src/services/product.service.js`: Factory pattern for product creation
- `src/auth/authUtils.js`, `src/auth/checkAuth.js`: Auth middleware
- `src/controllers/`: API endpoint logic
- `src/models/`: Mongoose schemas
- `src/routes/`: API route definitions
- `src/core/`: Error/response classes
- `src/middlewares/errorHandler.js`: Central error handler
- `.http` files: API test cases

---

If any conventions or workflows are unclear, please ask for clarification or provide feedback to improve these instructions.
