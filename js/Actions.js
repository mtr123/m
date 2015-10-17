import Dispatcher from './Dispatcher'

var _failedQueue = [];
var checkConnectionId;

var Actions = {
    like(momentId, storyId) {
        likeDislike(true, momentId, storyId);
    },

    dislike(momentId, storyId) {
        likeDislike(false, momentId, storyId);
    },

    getAll() {
        $.ajax({
            type: 'GET',
            url: 'https://storia.me/api/feed/content',
            xhrFields: {
                withCredentials: true
            }
        }).always((data) => {
            Dispatcher.dispatch({
                action: 'getAll',
                data: data ? data : { items: JSON.parse(localStorage.getItem(items)) }
            });
        })
    },

    sendFailedRequests() {
        _failedQueue.forEach((params) => {
            sendLikeDislikeRequest(params)
        });

        _failedQueue = [];
    }
};

/**
 * @param {boolean} isLike
 * @param {string} momentId
 * @param {string} storyId
 */
function likeDislike(isLike, momentId, storyId) {
    var dispatchData = {
        action: isLike ? 'like' : 'dislike',
        id: storyId
    };

    Dispatcher.dispatch(dispatchData);

    sendLikeDislikeRequest({
        isLike: true,
        momentId,
        storyId
    })
}

/**
 * Send like/dislike request
 * @description if request fail, it will add request in _failedQueue
 * _failedQueue try to send request again, when connection will appear
 * @param {object} params
 */
function sendLikeDislikeRequest(params) {
    var method = params.isLike ? 'POST' : 'DELETE';

    $.ajax({
        type: method,
        url: `https://storia.me/api/core/stories/${params.storyId}/moments/${params.momentId}/like`,
        xhrFields: {
            withCredentials: true
        }
    }).done(function() {
        clearInterval(checkConnectionId);
        checkConnectionId = null;
    }).fail(() => {

        //TODO (improvement) add it also in localStorage
        _failedQueue.push(params);

        if (!checkConnectionId) {
            checkConnectionId = checkConnection();
        }
    });
}

/**
 * Check connection existing.
 * @description Check connection every 2 sec; onLine property sometimes can give wrong result,
 * therefore it rechecks it by simple 'ping' request.
 * @returns {number}
 */
function checkConnection() {
    return setInterval(function() {
        if (window.navigator.onLine) {
            Actions.sendFailedRequests();
        } else {
            $.get('/ping', (data) => {
                if (data === 'pong') {
                    Actions.sendFailedRequests();
                }
            })
        }
    }, 2000);
}

export default Actions;