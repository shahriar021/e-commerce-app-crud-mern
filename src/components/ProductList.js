import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';

const ProductList=()=>{
    let [products,setProducts]=useState([]);

    useEffect(()=>{
            getProducts();
    },[])

    const getProducts=async()=>{
        let result =await fetch("http://localhost:5000/products",{
          headers:{
            Authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
        });
        result=await result.json();
        setProducts(result);
    }

    const deleteProduct =async(id)=>{
        console.log('suiiiiiiiiiiii',id)
       
        var send_cmd = "http://localhost:5000/product/" + String(id)
        let result = await fetch(send_cmd, {
          method: "Delete",
          headers: {
            Authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
        result = await result.json()
        if(result){
            alert("record is deleted")
            getProducts();
            // window.location.reload();
        }
        
        
    }

    const searchHandle = async(event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`, {
              headers: {
                Authorization: `bearer ${JSON.parse(
                  localStorage.getItem("token")
                )}`,
              },
            });
            result = await result.json();
            if (result) {
              setProducts(result);
            }
        }else{
            getProducts();
        }
        
        
        
    }

    products = Array.from(products)
    return (
      <div className="product-list">
        <h3>Product LIst</h3>
        <input type="text" className="search-product-box" placeholder="search product" 
        onChange={searchHandle}/>
        <ul>
          <li>S. No</li>
          <li>Name</li>
          <li>Price</li>
          <li>Category</li>
          <li>Company</li>
          <li>operation</li>
        </ul>
        {products.length> 0 ?products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <Link to={"/update/" + item._id}>update</Link>
            </li>
          </ul>
        ))
        :<h1>no result found</h1>}
        
      </div>
    );
}

export default ProductList;