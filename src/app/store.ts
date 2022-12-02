import {configureStore} from "@reduxjs/toolkit";
import {editSlice} from "../features/editSlice";
import {dkForKickSlice} from "../features/dkForKickSlice";


export const store = configureStore({
    reducer: {
        edit: editSlice.reducer,
        kick: dkForKickSlice.reducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// export type AccountState = ReturnType<typeof accountSlice.reducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch