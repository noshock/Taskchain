#  TaskChain - Decentralized Task Management dApp

TaskChain is a decentralized task management application (dApp) built on the Ethereum blockchain. It allows users to securely create, edit, complete, and delete tasks using MetaMask for wallet authentication and Solidity smart contracts for decentralized data storage.

---

##  Live Demo

**Website:** [https://taskchain-eight.vercel.app](https://taskchain-eight.vercel.app/)

---

##  Smart Contract

**Network:** Ethereum Sepolia

**Contract Address:**

```text
0xA45CAF4a2dbf47738f4063eEd5060e4EE5000Da2
```

#  Features

-  Connect MetaMask Wallet
-  Disconnect Wallet
-  Add New Tasks
-  View All Tasks
-  Edit Existing Tasks
-  Mark Tasks as Complete
-  Undo Completed Tasks
-  Delete Tasks
-  Live Task Counter
-  Toast Notifications
-  Loading Spinner During Transactions
-  Fully Responsive Design
-  Modern Dark Theme UI
-  Blockchain-Based Storage

---

#  Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript

### Blockchain

- Solidity
- Hardhat
- Ethers.js
- MetaMask
- Ethereum Sepolia Testnet

### Deployment

- Vercel

---

#  Project Structure

```
TaskChain/
│
├── contracts/
│   └── Todo.sol
│
├── scripts/
│   └── deploy.js
│
├── Frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── hardhat.config.cjs
├── package.json
└── README.md
```

---

#  How It Works

1. User connects their MetaMask wallet.
2. The frontend connects to the deployed smart contract using Ethers.js.
3. Users can:
   - Add tasks
   - Edit tasks
   - Complete or undo tasks
   - Delete tasks
4. Every action requires MetaMask confirmation.
5. Task data is stored securely on the Ethereum Sepolia blockchain.

---

#  Getting Started

## Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/TaskChain.git
```

## Navigate to the project

```bash
cd TaskChain
```

## Install dependencies

```bash
npm install
```

## Compile the Smart Contract

```bash
npx hardhat compile
```

## Deploy to Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## Run the Frontend

Open:

```
Frontend/index.html
```

using **Live Server** or any local web server.

---

#  Screenshots

## Home Page

<img width="1012" height="824" alt="image" src="https://github.com/user-attachments/assets/586d567a-8644-46bf-b06f-139816da45ef" />


---

## Wallet Connected

<img width="888" height="747" alt="image" src="https://github.com/user-attachments/assets/a1088747-f982-49b4-af2c-6f132fe7d6ca" />


---

## Task Management

<img width="656" height="864" alt="image" src="https://github.com/user-attachments/assets/1c26de60-cd19-4a65-8336-587e635b3693" />


---

## Edit Task

<img width="634" height="496" alt="image" src="https://github.com/user-attachments/assets/93dd8b71-7f41-4303-8113-964db1338d3d" />


---

#  Learning Outcomes

Through this project, I learned:

- Solidity Smart Contract Development
- Hardhat Development Environment
- Ethereum Transactions
- MetaMask Wallet Integration
- Ethers.js
- Smart Contract Deployment
- CRUD Operations on Blockchain
- Web3 Frontend Development
- Responsive UI Design
- Vercel Deployment

---

# Future Improvements

- Custom Edit Model
- Search Tasks
- Task Categories
- Due Dates
- Priority Levels
- Filter Completed/Pending Tasks
- IPFS Integration
- WalletConnect Support
- Multi-Chain Deployment
- Dark/Light Theme Toggle

---

#  Author

**prajwal chitriv**

---

#  License

This project is licensed under the MIT License.

---
