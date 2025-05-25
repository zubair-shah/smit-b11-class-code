import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    name: "zubair",
    age: 22

}
export const counterSlice = createSlice({
    name: "data",
    initialState,
    reducers: {


        changeName: (state, action) => {
            state.name = action.payload
        },

    }
})

export const { increment, decrement, incrementBy5, incrementByUserNumber } = counterSlice.actions
export default counterSlice.reducer;