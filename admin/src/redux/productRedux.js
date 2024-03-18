import {createSlice} from '@reduxjs/toolkit'

export const productSlice = createSlice({
    name:'product',
    initialState:{
        products:[],
        isFetching:false,
        error:false,
    },
    reducers:{
        // GET ALL
        getProductStart:(state)=>{
            state.isFetching=true
            state.error=false
        },

        getProductSuccess:(state,action)=>{
            state.isFetching=false
            state.error=false
            state.products=action.payload

        },

        getProductFailure:(state)=>{
            state.isFetching=false
            state.error=true

        },
        // GET DELETE
        deleteProductStart:(state)=>{
            state.isFetching=true
            state.error=false
        },

        deleteProductSuccess:(state,action)=>{
            state.isFetching=false
            state.error=false
            state.products.splice(
                state.products.findIndex(item=>item._id===action.payload._id),1)
        
            

        },

        deleteProductFailure:(state)=>{
            state.isFetching=false
            state.error=true

        },

        // UPDATE
        UpdateProductStart:(state)=>{
            state.isFetching=true
            state.error=false
        },

        UpdateProductSuccess:(state,action)=>{
            state.isFetching=false
            state.error=false
         state.products[state.products.findIndex((item)=>item._id===action.payload._id)]=action.payload.user
        
            

        },

        UpdateProductFailure:(state)=>{
            state.isFetching=false
            state.error=true

        },
        // adding new item
        addProductStart:(state)=>{
            state.isFetching=true
            state.error=false
        },

        addProductSuccess:(state,action)=>{
            state.isFetching=false
            state.error=false
       state.products.push(action.payload.product)
        
            

        },

        addProductFailure:(state)=>{
            state.isFetching=false
            state.error=true

        }



    },
});


export const{getProductStart,getProductSuccess,getProductFailure , deleteProductStart,deleteProductSuccess,deleteProductFailure ,UpdateProductStart,UpdateProductSuccess,UpdateProductFailure , addProductStart,addProductSuccess,addProductFailure}=productSlice.actions
export default productSlice.reducer