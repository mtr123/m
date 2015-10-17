import React from 'react';
import ReactDOM from 'react-dom';
import Feed from './Feed'

class App extends React.Component {
    render() {
        return (
            <div>
                <h2>Storia</h2>
                <Feed />
            </div>
        )
    }
}



ReactDOM.render(<App />, document.getElementById('app'));