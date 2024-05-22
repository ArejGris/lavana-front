import {configureStore} from '@reduxjs/toolkit'
import orderSlice from './features/orderSlice'
export const makeStore=()=>{
    return configureStore({
        reducer:{
            order:orderSlice
        }
    })
}