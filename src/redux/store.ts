import { combineReducers, configureStore } from '@reduxjs/toolkit';
import courseSlice from './features/course-slice';
import cartSlice from './features/cart-slice';
import wishlistSlice from './features/wishlist-slice';
import eventSlice from './features/event-slice';
import filterSlice from './features/filter-slice';
import authSlice from './features/auth-slice';
import { api } from './features/api-slice';

const rootReducer = combineReducers({
    api: api.reducer,
    auth: authSlice,
    courses: courseSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    event: eventSlice,
    filter: filterSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
