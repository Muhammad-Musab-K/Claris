import React from 'react';
import { Tabs } from 'rsuite';

function Tab({ activeKey, onSelect }) {
    console.log('Tab: ' + activeKey)
    return (
        <Tabs activeKey={activeKey} onSelect={onSelect} >
            <Tabs.Tab eventKey="all" title="All" />
            <Tabs.Tab eventKey="completed" title="Completed" />
            <Tabs.Tab eventKey="incoming" title="Incoming" />
            <Tabs.Tab eventKey="pending" title="Pending" />
            <Tabs.Tab eventKey="declined" title="Declined" />
            <Tabs.Tab eventKey="canceled" title="Canceled" />
        </Tabs>
    );
}

export default Tab;
