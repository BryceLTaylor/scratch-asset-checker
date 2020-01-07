import React from 'react';

const AssetItem = props =>  (
    <div>
        <span>{'status: ' + props.status}</span>
        <span>{'  sprite: ' + props.sprite}</span>
        <span>{'  asset name: ' + props.name}</span>
        <span>{'  asset md5: ' + props.ID}</span>
        <div></div>
    </div>
)

export default AssetItem;
