import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, decrementByValue, getuserData, increment, incrementByValue } from '../Redux/Slices/AccountSlice'
import { Bonusincrement } from '../Redux/Slices/BonusSlice'

const Account = () => {
    const account = useSelector(state => state.account)
    const points = useSelector(state => state.bonus.points)
    const dispatch = useDispatch()
    const [value, setValue] = useState()

    return (
        <div className="AccountContainer">
            <p>Account amount: ₹{account.pending ? "...Loading" : account.amount}</p>
            <p>Points : {points}</p>
            <span>
                Amount Buttons
            </span>
            <div className="buttonContainer">
                <button onClick={() => dispatch(increment())}>Increment</button>
                <button onClick={() => dispatch(decrement())}>Decrement</button>
                <input type="number" onChange={(e) => setValue(e.target.value)} />
                <button onClick={() => dispatch(incrementByValue(value))}>IncremtByValue</button>
                <button onClick={() => dispatch(decrementByValue(value))}>DecrementByValue</button>
                <button onClick={() => dispatch(getuserData(1))}>GetData</button>
            </div>
            <span>
                Points Button
            </span>
            <div className="buttonContainer">
                <button onClick={() => dispatch(Bonusincrement())}>Increment</button>
                {/* <button onClick={() => dispatch(decrement())}>Decrement</button> */}
            </div>
        </div>
    )
}

export default Account





