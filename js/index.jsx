import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
import classNames from 'classnames';

class Moment extends React.Component {
    constructor(props) {
        super(props);
        this.state = { likes: this.props.likes };
    }

    getPictureUrl() {
        var attachments = this.props.attachments;
        var len = attachments.length;
        var REG_EXP = /\d/g;

        if (!len) {
            return null;
        }

        for (var i = len; i--;) {
            var pic = attachments[i].file;
            if (REG_EXP.test(pic)) {
                return pic.path;
            }
        }

        return attachments[len - 1].file.path;
    }

    onClick(e) {
        e.preventDefault();
        e.stopPropagation();

        var likes = this.state.likes;
        var isLiked = this.state.liked;

        this.setState({
            liked: !isLiked,
            likes: isLiked ? likes - 1 : likes + 1
        })
    }

    render() {
        var picNode;
        var picUrl = this.getPictureUrl();

        if (picUrl) {
            picNode = <div className="moment-pic thumbnail"><img src={ picUrl } /></div>;
        }



        return (
            <a href="#" className="moment list-group-item">
                <h4 className="moment-title">{ this.props.title }</h4>

                <h5 className="moment-story-title">
                    { this.props.storyTitle }
                    <span className="moment-author label label-info">{ this.props.ownerName }</span>
                </h5>
                { picNode }
                <LikeBtn liked={ this.state.liked } likes={ this.state.likes } onClick={ this.onClick.bind(this) } />
            </a>
        )
    }
}

class LikeBtn extends React.Component {
    render() {
        var BtnClassName = classNames({
            'btn': true,
            'btn-success': this.props.liked,
            'btn-primary': true,
            'btn-xs': true
        });

        return (
            <button className={ BtnClassName } onClick={ this.props.onClick } type="button">
                Like <span className="badge">{ this.props.likes }</span>
            </button>
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
            var previewData = item.objectPreview;
            return (
                <Moment
                    key={ previewData.id }
                    likes={ previewData.stats.likes }
                    ownerName={ previewData.owner.name }
                    title={ previewData.title }
                    storyTitle={ previewData.storyTitle }
                    attachments={ previewData.attachments }
                />
            );
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

ReactDOM.render(<App />, document.getElementById('app'));