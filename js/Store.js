import dispatcher from './Dispatcher'
import { EventEmitter } from 'events';

var _items = [];

var Store = Object.assign({}, EventEmitter.prototype, {

    getAll() {
        return _items;
    },

    emitChange() {
        this.syncStorage();
        this.emit('change');
    },

    syncStorage() {
        localStorage.setItem('items', JSON.stringify(_items));
    },

    /**
     * @param {function} callback
     */
    addChangeListener(callback) {
        this.on('change', callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherIndex: dispatcher.register(function(payload) {
        var action = payload.action;

        switch(action) {
            case 'like':
            case 'dislike':
                _items.forEach((item) => {
                    var likes = item.objectPreview.stats.likes;

                    if (item.objectPreview.id === payload.id) {
                        item.objectPreview.stats.likes = action === 'like' ? likes + 1 : likes - 1;
                        item.objectPreview.liked = action === 'like';
                        return false;
                    }
                });

                Store.emitChange();
                break;

            case 'getAll':
                _items = payload.data.items;
                Store.emitChange();
                break;
        }

        return true; // No errors. Needed by promise in Dispatcher.
    })

});

export default Store;