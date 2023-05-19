import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../toolkitRedux/toolkitReducer';

export const Counter = () => {
    const count = useSelector(state => state.toolkit.count);
    const dispatch = useDispatch();
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={()=> dispatch(increment())}>+</button>
            <button onClick={()=> dispatch(decrement())}>-</button>
        </div>
    )
}
