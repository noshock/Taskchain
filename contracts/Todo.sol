// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract Todo {
    struct Task {
        uint256 id;
        string content;
        bool completed;
    }
    
    event TaskAdded(
        address indexed user,
        uint id,
        string content
    );
    event TaskCompleted(
        address indexed user,
        uint id, 
        bool completed
    );
    event TaskDeleted(
        address indexed user,
        uint id
    );

    mapping (address => Task[]) privateTask;

    function addTask(string memory _content) public {
        Task memory newTask;
        newTask.id = privateTask[msg.sender].length;
        newTask.content = _content;
        newTask.completed = false;

        privateTask[msg.sender].push(newTask);  

        emit TaskAdded(
            msg.sender,
            newTask.id,
            newTask.content
        ); 
    }

    function getTasks() public view returns (Task[] memory) {
        return privateTask[msg.sender];
    }

    function toggleTask(uint _id) public {
        require(_id < privateTask[msg.sender].length, "Task does not exist");
        Task storage task = privateTask[msg.sender][_id];
        task.completed = !task.completed;
        emit TaskCompleted(
           msg.sender,
           _id,
           task.completed
        );
    }

    function deleteTask(uint _id) public {
        require(_id < privateTask[msg.sender].length, "task does not exist");
        uint lastIndex = privateTask[msg.sender].length - 1;
        uint deletedId = privateTask[msg.sender][_id].id;
        privateTask[msg.sender][_id] = privateTask[msg.sender][lastIndex];
        privateTask[msg.sender][_id].id = _id;
        privateTask[msg.sender].pop();

        emit TaskDeleted(
            msg.sender,
            deletedId
        );

        
    }
         
         
    
}
