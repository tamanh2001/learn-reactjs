import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';



TodoFeature.propTypes = {

};

function TodoFeature(props) {
    const match=useRouteMatch();
    // cho biết path cha được match bởi path nào 
    //  sử dụng match.path cho path con, tức là tk cha xài path nào thì con xài path đấy, chứ không xài cố định.
    

    return (
        <div>
            <Switch>
                <Route path={match.path} component={ListPage} exact/>
                <Route path={`${match.path}/:todoId`} component={DetailPage} />

            </Switch>
        </div>
    );
}

export default TodoFeature;