import React, { useState,useEffect } from 'react'
import axios from "axios"
const Listcategories = () => {

  const[categories,setcategories]=useState([])

useEffect(() => {
  getcategories()
}, [])

const getcategories=async()=>{
await axios.get("http://localhost:3001/api/categories")
.then(res=>{
  setcategories(res.data)
})
.catch(error=>{
  console.log(error)
})
}

  return (
    <div>
      Liste des catégories
      <table className='table table-striped'>
        <thead>
          <th>Nom catégorie</th>
          <th>Image catégorie</th>
          <th>Action</th>
        </thead>
        <tbody>
      {categories.map((cat,index)=>
        <tr key={index}>
          <td>{cat.nomcategorie}</td>
          <td><img src={cat.imagecategorie} width={80} height={80}/></td>
          <td>
            <button className='btn btn-warning'>Modifier</button>
            <button className='btn btn-danger'>Supprimer</button></td>
        </tr>

      )}
      </tbody>
      </table>
    </div>
  )
}

export default Listcategories
