import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './styles.scss';

TodoList.propTypes = {
    todoList: PropTypes.array,
    onTodoClick: PropTypes.func,

};
TodoList.defaultProps = {
    todoList: [],
    onTodoClick: null,
}

function TodoList({ todoList, onTodoClick }) {
    const handleTodoClick = (todo, idx) => {
        if (!onTodoClick) return;

        onTodoClick(todo, idx);
    }
    return (
        <ul className="todo-List">
            {
                todoList.map((todo, idx) => (
                    // khi map lấy todo ,lấy thêm cả idx, vì khi thay đổi state của một item nào đó phải biết vị trí của nó
                    <li key={todo.id}
                        className={classnames({
                            'todo-item': true,
                            // li luôn có class là todo item
                            completed: todo.status === 'completed'
                            // có thêm class là completed nếu có trạng thái là completed 
                        })}
                        onClick={() => handleTodoClick(todo, idx)}
                    // mỗi khi thẻ li được click thì chạy hàm handle

                    >{todo.title}</li>
                ))
            }
        </ul>
    );
}

export default TodoList;