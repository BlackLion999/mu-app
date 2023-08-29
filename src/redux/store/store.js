import { configureStore } from '@reduxjs/toolkit';
import { apiSLice } from '../services/api';
import { userApi } from '../services/userApi';
import tasksReducer from '../features/tasksReducer';


const store = configureStore({
    reducer: {
        [apiSLice.reducerPath]: apiSLice.reducer,
        [userApi.reducerPath]: userApi.reducer,
        tasksReducer: tasksReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([apiSLice.middleware, userApi.middleware ]),
})

export default store