# Tip Manager

The "Tip Manager" app allows users to calculate tips and store the calculations in a database. Users can sign up, log in, calculate tips, and retrieve tip.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your local machine.

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/mksaiyed/tip-manager.git
    ```

2. **Navigate to the project directory:**

    ```sh
    cd tip-manager
    ```

3. **Install dependencies:**

    ```sh
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd frontend
    npm install
    ```

4. **Set up environment variables:**

-   Create a .env file in the backend directory and define any necessary environment variables.
    ```sh
     cd backend
     cp .env.sample .env
    ```

5. **Start the development server:**

    ```sh
    # Start the backend server
    cd backend
    npm run start

    # Start the frontend server
    cd frontend
    npm run dev
    ```

6. **Open your browser:**

-   Your project should now be running at `http://localhost:5173`.
