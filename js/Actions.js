import Dispatcher from './Dispatcher'

function _likeDislike(isLike, momentId, storyId) {
    var method = isLike ? 'POST' : 'DELETE';

    $.ajax({
        type: method,
        url: `https://storia.me/api/core/stories/${storyId}/moments/${momentId}/like`,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            // if something going wrong and request returns an error,
            // we can cancel changes by calling _likeDislike again
        }
    });
}

var Actions = {
    like(momentId, storyId) {
        Dispatcher.dispatch({
            action: 'like',
            id: storyId
        });

        _likeDislike(true, momentId, storyId);
    },

    dislike(momentId, storyId) {
        Dispatcher.dispatch({
            action: 'dislike',
            id: storyId
        });

        _likeDislike(false, momentId, storyId);
    },

    getAll() {
        $.ajax({
            type: 'GET',
            url: 'https://storia.me/api/feed/content',
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
                Dispatcher.dispatch({
                    action: 'getAll',
                    data: data
                });
            }
        });
    }
};

export default Actions;