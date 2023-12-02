import React, { useState,useEffect} from 'react'
import axios from "axios"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


import AjoutArticle from './Insertarticle'

import TablePagination from '@mui/material/TablePagination';

const Listarticles = () => {

  const [articles,setArticles]=useState([])

  //les paramètres de la pagination
  const [tot,setTot]=useState(0)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const allowedRowsPerPage = [5, 10, 25, 50, 100];
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

 

  const handleChangeRowsPerPage = (event) => {
    const selectedRowsPerPage = parseInt(event.target.value, 10);

        setRowsPerPage(selectedRowsPerPage);
        setPage(0);
  };

useEffect(() => {
  fetcharticles()
},[page,rowsPerPage])

  const fetcharticles=async()=>{ 
    
      let url = "http://localhost:3001/api/articles/productspage"+ `?pagesize=${(tot=== 0 || tot>=rowsPerPage) ?rowsPerPage:tot}`
    await axios.get(url)
    .then(res=>{
      setArticles(res.data.articles)
      setTot(res.data.tot)
    })
    .catch(error=>{
      console.log(error)

    })
  
  }

  const addproduct=(newproduit)=>{
        
    setArticles([newproduit,...articles])
    }

    const handleDelete = async (id) => {
      if (!window.confirm('Are you sure you want to delete')) {
        return;
      }
  
      await axios.delete('http://localhost:3001/api/articles/' + id)
        .then(() => {
          console.log('successfully deleted!');
          setArticles(articles.filter((article) => article._id !== id));
        
        })
        .catch((error) => {
          console.log(error);
        });
    };

   

  return (
<div className='container'>
<div >
<nav className="navbar navbar-expand-lg navbar-dark bg-success " >
<div className="container-fluid">


<AjoutArticle addproduct={addproduct} />

</div>
</nav>
</div>
<div className="py-4">
    <Table striped bordered hover size="sm" className="table border shadow">
      <thead>
        <tr>
          <th>Image</th>
          <th>Référence</th>
          <th>Désignationb</th>
          <th>Marque</th>
          <th>Prix</th>
          <th>Qté stock</th>
          <th>Modifier</th>
          <th>Supprimer</th>
        </tr>
      </thead>
      <tbody>
        { articles.map((art,index)=>
        <tr key={index}>
          <td><img src={art.imageart} width={80} height={80} /></td>
          <td>{art.reference}</td>
          <td>{art.designation}</td>
          <td>{art.marque}</td>
          <td>{art.prix}</td>
          <td>{art.qtestock}</td>
         <td> <Link className="btn btn-outline-primary mx-2" to={`/article/edit/${art._id}`}>
         <i className="fa-solid fa-pen-to-square"></i>
          Edit
        </Link>
         </td>
          <td><Button variant="outline-danger"
          onClick={() => handleDelete(art._id)}
          >
          
          <i className="fa-solid fa-trash"></i>
            Delete</Button></td>
        </tr>
        )}
      </tbody>
    </Table>
    </div>
    <div>
 
</div>


    <TablePagination
      component="div"
      count={tot}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={allowedRowsPerPage}
    />
    </div>
  )
}

export default Listarticles
