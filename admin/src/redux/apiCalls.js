import { loginStart,loginfailure,loginSuccess } from "./userRedux";
import {publicRequest, userRequest} from '../requestMethods'
import { UpdateProductFailure, UpdateProductStart, UpdateProductSuccess, addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess } from "./productRedux";

export const login=async(dispatch,user)=>{

    dispatch(loginStart());
    try{
        const res=await publicRequest.post('/auth/login',user) 
        // console.log(res.data)
        dispatch(loginSuccess(res.data))

    }catch(err){
        dispatch(loginfailure())
    }
    

}
export const getProducts=async(dispatch)=>{

    dispatch(getProductStart());
    try{
        const res=await publicRequest.get('/products') 
        // console.log(res.data)
        dispatch(getProductSuccess(res.data))

    }catch(err){
        dispatch(getProductFailure())
    }
    

}
export const deleteProducts=async(id,dispatch)=>{

    dispatch(deleteProductStart());
    try{
        // const res=await userRequest.delete(`/products/${id}`) 
        // console.log(res.data)
        dispatch(deleteProductSuccess(id))

    }catch(err){
        dispatch(deleteProductFailure())
    }
    

}
export const UpdateProducts=async(id,product,dispatch)=>{

    dispatch(UpdateProductStart());
    try{
        // const res=await userRequest.delete(`/products/${id}`) 
        // console.log(res.data)
        dispatch(UpdateProductSuccess({id,product}))

    }catch(err){
        dispatch(UpdateProductFailure())
    }
    

}
export const addProducts=async(product,dispatch)=>{

    dispatch(addProductStart);
    try{
        const res=await userRequest.post(`/products`,product) 
        // console.log(res.data)
        dispatch(addProductSuccess(res.data))

    }catch(err){
        dispatch(addProductFailure())
    }
    

}