import dispatcher from './Dispatcher'
import { EventEmitter } from 'events';

var _items = [];

var Store = Object.assign({}, EventEmitter.prototype, {

    getAll() {
        return _items;
    },

    emitChange() {
        this.emit('change');
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
                _items.forEach((item) => {
                    if (item.objectPreview.id === payload.id) {
                        item.objectPreview.stats.likes += 1;
                        item.objectPreview.liked = true;
                        return false;
                    }
                });
                Store.emitChange();
                break;

            case 'dislike':
                _items.forEach((item) => {
                    if (item.objectPreview.id === payload.id) {
                        item.objectPreview.stats.likes -= 1;
                        item.objectPreview.liked = false;
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