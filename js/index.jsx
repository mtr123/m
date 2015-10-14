import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';

const { Route, NotFoundRoute, DefaultRoute, Link, RouteHandler } = Router;

class Moment extends React.Component {
    render() {
        return (
            <div className='moment'>
                <div className='moment-title'>{ this.props.title }</div>
                <div className='moment-pic'>{ this.props.pic }</div>
                <span className='moment-author'>{ this.props.author }</span>
            </div>
        )
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <div className='filters'>
                    Моменты с картинками | Моменты без картинок
                </div>
                <div className='like'>like</div>
            </div>
        )
    }
}

var routes = (
    <Route name="app" path="/" handler={App}>
        <DefaultRoute handler={App}/>
        <Route name="items" handler={App} />
        <Route name="item" path="/item/:item" handler={Item} />
    </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
    ReactDOM.render(<App />, document.getElementById('app'));
});

