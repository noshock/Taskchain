console.log("app.js loaded");

const CONTRACT_ADDRESS = "0x0Ec2f62eD256b08A4d07a4B4BB0E113d2868127A";

const ABI = [
  {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "content",
          "type": "string"
        }
      ],
      "name": "TaskAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "completed",
          "type": "bool"
        }
      ],
      "name": "TaskCompleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "TaskDeleted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_content",
          "type": "string"
        }
      ],
      "name": "addTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "deleteTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTasks",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "content",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "completed",
              "type": "bool"
            }
          ],
          "internalType": "struct Todo.Task[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "toggleTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
];

const connectBtn = document.getElementById("connectBtn");
const walletAddress = document.getElementById("walletAddress");
const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const toast = document.getElementById("toast");

let contract = null;

function showToast(message, type = "success") {

    toast.innerText = message;

    if (type === "success") {
        toast.style.borderLeftColor = "#22c55e";
    } else {
        toast.style.borderLeftColor = "#ef4444";
    }

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

async function connectWallet() {
    if (!window.ethereum) {
        alert("Please install MetaMask.");
        return;
    }

    await window.ethereum.request({
        method: "eth_requestAccounts"
    });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        signer
    );

    const address = await signer.getAddress();
    walletAddress.textContent =
    `${address.slice(0,6)}...${address.slice(-4)}`;
    addBtn.disabled = false;
    taskInput.disabled = false;
    connectBtn.innerText = "Disconnect";
    console.log("wallet connected");
}

async function addTask() {
    if (!contract) {
        showToast("Connect your wallet first!", " error ");
        return;
    }

    const text = taskInput.value.trim();

    if (text === "") {
        showToast("Please enter a task!", "error");
        return;
    }

    try {
        addBtn.disabled = true;
        addBtn.innerHTML = `
        <span class="spinner"></span> Adding...
        `;

        const tx = await contract.addTask(text);
        await tx.wait();

        await loadTasks();

        showToast("Task added successfully!");

        taskInput.value = "";
        taskInput.focus();

    } catch (error) {
        console.error(error);
        showToast("Transaction cancelled!", "error");
    } finally {
        addBtn.disabled = false;
        addBtn.innerHTML = "Add Task";
    }
}

async function loadTasks() {
  if (!contract) {
    return;
  }
    
    const tasks = await contract.getTasks();

    if (tasks.length === 0) {
      taskList.innerHTML = `
              <li style = "justify-content:center;color:#A6A6A6;">
               No tasks yet. Add your first task!
               </li>
      `;
      document.getElementById("taskCount").innerText = "Total Tasks: 0";
      return;
    }

    document.getElementById("taskList").innerHTML = "";
    document.getElementById("taskCount").innerText = `Total Tasks: ${tasks.length}`;
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `
      <span>${task.content}</span>
      <button class="complete">
       ${task.completed ? "Undo" : "Complete"}
      </button>
      <button class="delete">Delete</button>
      `;
      const completeBtn = li.querySelector(".complete");
      const deleteBtn = li.querySelector(".delete");
      completeBtn.addEventListener("click", async () => {

        const tx = await contract.toggleTask(task.id);
        await tx.wait();
        await loadTasks();

      });

      deleteBtn.addEventListener("click", async () => {
        const tx = await contract.deleteTask(task.id.toNumber());
        await tx.wait();
        await loadTasks();


      });
      taskList.prepend(li);
      
    });
    return tasks;

}

connectBtn.addEventListener("click", async () => {

    if (contract) {

        contract = null;
        addBtn.disabled = true;
        taskInput.disabled = true;

        walletAddress.textContent = "Wallet: Not connected";

        taskList.innerHTML = "";

        document.getElementById("taskCount").innerText = "Total Tasks: 0";

        connectBtn.innerText = "Connect Wallet";

        showToast("Wallet disconnected!");

        return;
    }

    await connectWallet();

});

addBtn.addEventListener("click", async () => {
    await addTask();
});