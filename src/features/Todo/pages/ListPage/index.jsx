import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import TodoForm from '../../components/TodoForm';
import TodoList from '../../components/TodoList';




ListPage.propTypes = {

};

function ListPage(props) {
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
    // useState trả về vị trí mới bất cứ khi nào URL thay đổi dùng hàm useLocation()
     const location = useLocation();
     const history = useHistory();
     const match = useRouteMatch(); 


    const [todoList, setTodoList] = useState(initTodoList);
    const [filteredStatus, setFilteredStatus] = useState(()=>{
        const params = queryString.parse(location.search);
        console.log(params);
        return params.status ||'all';
  });
    // mảng khởi tạo const[state,hàm cập nhật] initTodoList là gt ban đầu(gt khởi tạo)
useEffect(()=>{
    // mỗi khi thấy search thay đổi(phần sau dấu ?) 
    // thì cập nhật lại status=Params trong location.search dùng useEffect
    // để khi reload vẫn giữ nguyên trang
    const params = queryString.parse(location.search);
    setFilteredStatus(params.status ||'all');

},[location.search]);

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
        // setFilteredStatus('all');
        const queryParams= {status:'all'};
        history.push({
            pathname: match.path,
            // cái path hiện tại của mình
            search : queryString.stringify(queryParams),

        });
    }
    const handleShowCompletedClick = () => {
        //  setFilteredStatus('completed');
        const queryParams= {status:'completed'};
        history.push({
            pathname: match.path,
            // cái path hiện tại của mình
            search : queryString.stringify(queryParams),
    });
}
    const handleShowNewClick = () => {
        //  setFilteredStatus('new');
        const queryParams= {status:'new'};
        history.push({
            pathname: match.path,
            // cái path hiện tại của mình
            search : queryString.stringify(queryParams),
    });}
    const renderedTodoList = useMemo(()=>{

        return todoList.filter(todo => filteredStatus === 'all' || filteredStatus === todo.status);
    },[todoList,filteredStatus])
    // chỉ tính toán lại khi todoList hoặc filteredStatus thay đổi, còn không thì giữ nguyên.
    const handleTodoFormSubmit=(values)=>{
        console.log('Form submit:',values);
    };

    return (
        <div>
            <h3>What to do</h3>
            <TodoForm onSubmit={handleTodoFormSubmit}/>
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

export default ListPage;