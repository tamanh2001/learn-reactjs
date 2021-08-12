import React, { useState } from 'react';

import TodoList from './components/TodoList';


TodoFeature.propTypes = {

};

function TodoFeature(props) {
    const initTodoList = [
        {
            id: 1,
            title: 'Eat',
            status: 'new',
        },
        {
            id: 2,
            title: 'Sleep',
            status: 'completed',
        },
        {
            id: 3,
            title: 'Code',
            status: 'new',
        }
    ];
    const [todoList, setTodoList] = useState(initTodoList);
    const [filteredStatus, setFilteredStatus] = useState('all')
    // mảng khởi tạo const[state,hàm cập nhật] initTodoList là gt ban đầu(gt khởi tạo)

    const handleTodoClick = (todo, idx) => {
        console.log(todo, idx);
        // khi làm việc với object và array thì phải clone nó ra một cái mảng mới,nếu không nó sẽ không thay đổi
        // clone current array to the new one
        const newTodoList = [...todoList];
        // toggle state
        const newTodo = {
            ...newTodoList[idx],
            status: newTodoList[idx].status === 'new' ? 'completed' : 'new',
            // nếu status new = status hiện tại =new thì chuyển thành completed, comp thì chuyển thành new
        };
        newTodoList[idx] = newTodo;
        setTodoList(newTodoList);

    }
    const handleShowAllClick = () => {
        setFilteredStatus('all');
    }
    const handleShowCompletedClick = () => {
        setFilteredStatus('completed');
    }
    const handleShowNewClick = () => {
        setFilteredStatus('new');
    }
    const renderedTodoList = todoList.filter(todo => filteredStatus === 'all' || filteredStatus === todo.status);


    return (
        <div>
            <h3>Todo List</h3>
            <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick} />
            {/* mỗi khi item nào đó click thì phải báo lên cho tk cha ở trên, chạy hàm handle */}
            <div>
                <button onClick={handleShowAllClick}>Show All</button>
                <button onClick={handleShowCompletedClick}>Show Completed</button>
                <button onClick={handleShowNewClick}>Show New</button>

            </div>
        </div>
    );
}

export default TodoFeature;