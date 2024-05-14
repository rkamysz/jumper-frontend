# Ethereum Account and Token Frontend

This is a simple web application built with Next.js that allows users to authenticate using their Ethereum wallet, create an account, and display a list of ERC20 tokens associated with the user's Ethereum address. The application uses backend APIs to perform data operations.

## Features

1. **User Authentication via Ethereum Wallet** - Users can connect their wallets using Web3Modal.
2. **Account Creation** - Users can create an account by signing a message to verify their Ethereum address.
3. **Display Token List** - Users can see a list of ERC20 tokens associated with their Ethereum address.
4. **Error Handling** - In case of API errors, users receive appropriate error messages displayed as alert popups.

## Requirements

- Node.js (version 14 or later)
- npm or yarn
- Valid backend URL in the `.env.local` file

## Installation

1. Clone the repository:

```bash
git clone https://github.com/rkamysz/jumper-frontend.git
    cd jumper-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Configure environment variables:

Create a `.env.local` file in the root directory of the project and add the following environment variables:

```
NEXT_PUBLIC_CREATE_ACCOUNT_API_URL=http://localhost:8080/v1/account/create
NEXT_PUBLIC_GET_ACCOUNT_API_URL=http://localhost:8080/v1/account
NEXT_PUBLIC_FETCH_TOKENS_API_URL=http://localhost:8080/v1/tokens
```

Make sure the URLs points to the correct addresses of your backend.

## Running the Application

To run the application in development mode, use:

```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the running application.

## Project Structure

- `app/context` - Contains React contexts for managing authentication and error state.
- `app/components` - Contains UI components such as `WalletConnect` and `ErrorAlert`.
- `app/utils` - Contains utility functions for making API requests.
- `app/account` - Contains the user dashboard page with account and token information.

## Important Information

- The application makes regular HTTP requests to the backend, there is no WebSocket connection.
- In case of API errors, users receive error messages displayed as alert popups over the entire page.

## Example Usage

### User Authentication

The user can connect their Ethereum wallet using the `Connect Wallet` button. Upon successful connection, the user is redirected to the dashboard page.

### Account Creation

On the dashboard page, the user can create an account by clicking the `Create Account` button. This process requires signing a message using the user's Ethereum wallet.

### Displaying Token List

On the dashboard page, the user can see a list of ERC20 tokens associated with their Ethereum address.
