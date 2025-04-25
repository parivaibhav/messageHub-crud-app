# MessageHub - MEN Stack CRUD Web Application

MessageHub is a simple CRUD web application built using the MEN stack (MongoDB, Express.js, Node.js). It allows users to manage chat messages with the following functionalities:

## Features

1. **Create a New Chat**:

   - Add a new chat with the following details:
     - **Forwarder Name**: The name of the sender.
     - **Receiver Name**: The name of the recipient.
     - **Message**: The content of the message.

2. **View All Chats**:

   - Retrieve and display a list of all chats stored in the database.

3. **Edit a Chat**:

   - Update the **message** of an existing chat. Only the message can be modified.

4. **Delete a Chat**:
   - Remove a specific chat from the database.

## Tech Stack

- **MongoDB**: Database for storing chat data.
- **Express.js**: Web framework for building the API.
- **Node.js**: Backend runtime environment.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/messagehub.git
   cd messagehub
   ```

## Folder Structure

```bash
 crud App/ 
 ├── models/
 ├── node_modules/ 
 ├── public/ 
 ├── views/
 ├── index.js 
 ├── init.js
 ├── package.json 
 ├── package-lock.json 
 └── README.md 
 ```



## Packages

1.Install packages:
   ```bash
    npm i express
    npm i method-override
    npm i mongoose
    npm i ejs
   ```
