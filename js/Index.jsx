import React from 'react';
import ReactDOM from 'react-dom';
import Feed from './Feed'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {auth: null};
    }

    componentDidMount() {
        this.setAuth().then((data) => {
            this.setState({
                auth: data
            })
        });
    }

    setAuth() {
        return new Promise((resolve) => {
            $.ajax({
                type: 'POST',
                url: 'https://storia.me/api/acl/auth/Selfish/test_task@example.com',
                data: JSON.stringify({password: 'qwe123', remember: false, token: ''}),
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    resolve(data);
                },
                contentType: 'application/json',
                dataType: 'json'
            });
        });
    }

    render() {
        var Spinner = (
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        );

        return (
            <div>
                <h2>Storia</h2>
                {this.state.auth ? <Feed /> : Spinner }
            </div>
        )
    }
}



ReactDOM.render(<App />, document.getElementById('app'));