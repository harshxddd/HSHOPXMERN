import "./productList.css";
import { DataGrid} from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { productRows } from '../../DummyData';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import { deleteProducts, getProducts } from '../../redux/apiCalls';
export default function ProductList() {
   
    

    const dispatch =useDispatch()
    const products =useSelector((state)=>state.product.products)

    useEffect(()=>{
        getProducts(dispatch)
    },[dispatch])

    const handleDelete = (id) =>{
       deleteProducts(id,dispatch)
       console.log(id)
    };
    const columns = [
        { field: '_id', headerName: 'ID', width: 10 },
        { field: 'product', headerName: 'Product', width: 400,renderCell:(params)=>{
            return (
                <div className="productListItem">
                    <img src={params.row.img} alt="" className='productListImg' />
                    {params.row.title}
                </div>
            )
        } },
        { field: 'inStock', headerName: 'Stock', width: 300 },
       
        {
          field: 'price',
          headerName: 'Price',
          width: 160,
        },
        {
            field:"action",
            headerName:"Action",width:150,
            renderCell: (params)=> {
                return(<>
                <Link to={"/product/"+params.row._id}>
                    <button className="productListEdit">Edit</button>
                </Link>
                    <DeleteOutline className="productListDelete" onClick={()=>handleDelete(
                        params.row._id
                    )}/>
                </>
                );
            }
        },
      ];
  return (
    <div className='productList'>
        <DataGrid
        rows={products} disableRowSelectionOnClick
        columns={columns}
        getRowId={row=>row._id}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}
