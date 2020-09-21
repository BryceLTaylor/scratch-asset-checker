import React from 'react';
import styles from './block-item.css';

const BlockItem = props =>  (
    <div>
        <span className="block-name">{'block: ' + props.block.opcode}</span>
        <span>{'  total count: ' + props.block.totalCount}</span>
        <div>
            {props.block.sprites.map(
                (sprite) => (
                    <div>
                        <span>{'     Sprite name: ' + sprite.sprite}</span>
                        <span>{'  count: ' + sprite.count}</span>
                    </div>
                )
            )}
        </div>
    </div>
)

export default BlockItem;
