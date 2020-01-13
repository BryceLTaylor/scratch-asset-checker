import React from 'react';
import styles from './asset-item.css';

const AssetItem = props =>  (
    <div>
        <span className={props.status === 200 ? 'twoHundred' : 'fourHundred'}> {'status: ' + props.status}</span>
        <span>{'  sprite: ' + props.sprite}</span>
        <span>{'  asset name: ' + props.name}</span>
        <span>{'  asset md5: ' + props.ID}</span>
        <div></div>
    </div>
)

export default AssetItem;
