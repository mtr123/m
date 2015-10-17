import React from 'react';
import LikeBtn from './LikeBtn';
import Feed from './Feed';
import Actions from './Actions';

export default class Moment extends React.Component {
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

        if (!this.props.liked) {
            Actions.like(this.props.storyId, this.props.momentId);
        } else {
            Actions.dislike(this.props.storyId, this.props.momentId);
        }
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
                <LikeBtn liked={ this.props.liked } likes={ this.props.likes } onClick={ this.onClick.bind(this) } />
            </a>
        )
    }
}