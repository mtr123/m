import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';

class Moment extends React.Component {
    getPictureUrl() {
        var attachments = this.props.attachments;
        var len = attachments.length;
        var REG_EXP = /\d/g;

        for (var i = len; i--;) {
            return REG_EXP.test(attachments[i].file.title);
        }

        return attachments[len - 1];
    }

    render() {
        var picNode;
        var picUrl = this.getPictureUrl();

        if (picUrl) {
            picNode = <div className="moment-pic"><img src="{ picUrl }" /></div>;
        }

        return (
            <a href="#" className="moment list-group-item">
                <h4 className="moment-title">{ this.props.title }</h4>

                <h5 className="moment-story-title">
                    { this.props.storyTitle }
                    <span className="moment-author label label-info">{ this.props.owner.name }</span>
                </h5>
                { picNode }
                <button className="btn btn-primary btn-xs" type="button">
                    Like <span className="badge">{ this.props.stats.likes }</span>
                </button>
            </a>
        )
    }
}

class Moments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    componentDidMount() {
        this.setAuth().then(this.getMoments());
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
                success: function() {
                    resolve();
                },
                contentType: 'application/json',
                dataType: 'json'
            });
        });
    }

    getMoments() {
        var that = this;

        $.ajax({
            type: 'GET',
            url: 'https://storia.me/api/feed/content',
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
                that.setState(data);
            }
        });
    }

    render() {
        var List = this.state.items.map((item) => {
            return <Moment key={ item.objectPreview.id } { ...item.objectPreview } />;
        });

        return (
            <div className="list-group">
                { List }
            </div>
        )
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <h2>Storia</h2>
                <Moments />
            </div>
        )
    }
}

class NoMatch extends React.Component {
    render() {
        return 404;
    }
}

ReactDOM.render((
    <Router>
        <Route path="/" component={App}>
            <Route name="items" component={App} />
            <Route path="*" component={NoMatch}/>
        </Route>
    </Router>
), document.getElementById('app'));