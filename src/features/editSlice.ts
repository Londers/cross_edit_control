import {EditInfo} from "../common";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";

const initialState: EditInfo = {
    areaInfo: {},
    arms: [],
    crosses: [],
    message: "",
    regionInfo: {}
}

export const editSlice = createSlice({
    name: "edit",
    initialState,
    reducers:{
        setEditInfo: (state, action: PayloadAction<EditInfo>) => {
            if (state) {
                action.payload.crosses.sort((a,b) => (a.pos.id - b.pos.id))
                action.payload.arms.sort((a,b) => (a.pos.id - b.pos.id))
                Object.assign(state, action.payload)
            }
        }
    }
})

export const {setEditInfo, } = editSlice.actions

export const selectEditInfo = (state: RootState) => state.edit

export default editSlice.reducer