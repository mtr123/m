import Moment from './Moment';
import React from 'react';
import Store from './Store';
import Actions from './Actions';

export default class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    componentDidMount() {
        Actions.getAll();
        Store.addChangeListener(this.getMoments.bind(this));
    }

    componentWillUnmount() {
        Store.removeChangeListener(this.getMoments.bind(this));
    }

    /**
     * Gets moments from Store
     */
    getMoments() {
        this.setState({
            items: Store.getAll()
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
                    storyId={ previewData.storyId }
                    momentId={ previewData.id }
                    liked={ previewData.liked }
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