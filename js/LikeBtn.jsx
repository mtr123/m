import React from 'react';
import classNames from 'classnames';

export default class LikeBtn extends React.Component {
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