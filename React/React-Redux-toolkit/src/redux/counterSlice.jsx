import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: 20,
    name: "zubair",
    
}
export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            if (state.value === 0) {
                return
            }
            state.value -= 1
        },
        incrementBy5: state => {
            state.value += 5
        },
        incrementByUserNumber: (state, action) => {
            console.log("action", action)
            state.value += action.payload
        },
    }
})

export const { increment, decrement, incrementBy5, incrementByUserNumber } = counterSlice.actions
export default counterSlice.reducer;