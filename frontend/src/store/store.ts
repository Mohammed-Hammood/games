import { configureStore } from '@reduxjs/toolkit';
import { gamesSlice } from './slices';


const store = configureStore({
    reducer: {
        [gamesSlice.name]: gamesSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;