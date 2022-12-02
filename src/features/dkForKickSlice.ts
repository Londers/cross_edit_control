import {EditInfo, EngagedDk} from "../common";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";

const initialState: EditInfo = {
    areaInfo: {},
    arms: [],
    crosses: [],
    message: "",
    regionInfo: {}
}

export const dkForKickSlice = createSlice({
    name: "kick",
    initialState,
    reducers:{
        setForKickInfo: (state, action: PayloadAction<EditInfo>) => {
            if (state) Object.assign(state, action.payload)
        },
        setDkForKick: (state, action: PayloadAction<EngagedDk[]>) => {
            if (state) state.crosses = action.payload
        },
        setArmDkForKickInfo: (state, action: PayloadAction<EngagedDk[]>) => {
            if (state) state.arms = action.payload
        },
    }
})

export const {setForKickInfo, setDkForKick, setArmDkForKickInfo} = dkForKickSlice.actions

export const selectForKick = (state: RootState) => state.kick

export default dkForKickSlice.reducer