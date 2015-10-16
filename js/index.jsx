import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';

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

class Moments extends React.Component {
    componentDidMount() {
        this.getMoments();
    }

    getMoments() {
        $.get('https://storia.me/api/feed/content', function() {
            debugger;
        })
    }

    render() {
        return (
            <Auth />
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

class Auth extends React.Component {
    render() {
        return (
            <form method="POST" action="https://storia.me/api/acl/auth/Selfish/test_task@example.com">
                <input type="hidden" name="password" value="qwe123" />
                <input type="hidden" name="remember" value="false" />
                <input type="hidden" name="token" value="" />
                <button>Authorize</button>
            </form>
        )
    }
}

class NoMatch extends React.Component {
    render() {
        return 404;
    }
}

function init() {
    ReactDOM.render((
        <Router>
            <Route path="/" component={Moments}>
                <Route name="items" component={Moments} />
                <Route path="*" component={NoMatch}/>
            </Route>
        </Router>
    ), document.getElementById('app'));
}

$.ajax({
    type: 'POST',
    url: 'https://storia.me/api/acl/auth/Selfish/test_task@example.com',
    data: JSON.stringify({password: 'qwe123', remember: false, token: ''}),
    xhrFields: {
        withCredentials: true
    },
    success: function() {
        init();
    },
    contentType: 'application/json',
    dataType: 'json'
});

