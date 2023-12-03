import React from 'react'
import { useMemo , useState, useEffect } from 'react';
import { MaterialReactTable,useMaterialReactTable} from 'material-react-table';
import { Box } from '@mui/material';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import {deletearticle} from "../../services/articleservice"


import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import Insertarticle from './Insertarticle';

import Editarticle from './Editarticle';

const ArticleList = () => {

  //pour edit modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
const [article,setArticle]=useState([])

// crud methods
const addproduct=(newproduit)=>{
        
  setProducts([newproduit,...products])
  }
  const  deleteProduct = (productId,ref) => {
      confirmAlert({
          title: "Confirm delete...",
          message: " supprimer l' article: " + ref,
          buttons: [
          {
          label: 'Oui',
          onClick: () =>  deletearticle(productId)
          .then(res=>
          setProducts(products.filter((product) => product._id !== productId)))
          //.then(console.log("suppression effectuée avec success"))
          .catch(error=>console.log(error))
          },
          {
          label: 'Non',
          }
          ]
          });
          }
const updateProduct = (prmod) => {
setProducts(products.map((product) =>product._id === prmod._id ? prmod : product));
};

    //products and fetching state
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  //table state
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  //if you want to avoid useEffect, look at the React Query example instead
  useEffect(() => {
    const fetchData = async () => {
      if (!products.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }
    /*  const url = new URL(
        '/api/data',
        process.env.NODE_ENV === 'production'
          ? 'https://www.material-react-table.com'
          : 'http://localhost:3000',
      );*/
      /*
      url.searchParams.set(
        'start',
        `${pagination.pageIndex * pagination.pageSize}`,
      );
      url.searchParams.set('size', `${pagination.pageSize}`);
      url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
      url.searchParams.set('globalFilter', globalFilter ?? '');
      url.searchParams.set('sorting', JSON.stringify(sorting ?? []));
   */
      try {
    //const response = await fetch(url.href);
    // const json = await response.json();
    //setData(json.data);
    //setRowCount(json.meta.totalRowCount);

    let url = "http://localhost:3001/api/articles/productspage"+ `?page=${pagination.pageIndex+1}&pagesize=${pagination.pageSize}`
     const json = await  axios.get(url)
          
        setProducts(json.data.articles);
        setRowCount(json.data.tot);
        
      } catch (error) {
        setIsError(true);
        console.error(error);
        return;
      }
      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    columnFilters,
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
  ]);

  const columns = useMemo(

    () => [
      {
        accessorKey: 'imageart', //access nested data with dot notation
        header: 'Image',
        Cell: ({ cell}) => (
        <Box
        sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        }}
        >
        <img
        alt=""
        height={100}
        src={cell.getValue()}
        loading="lazy"
        style={{ borderRadius: '20%' }}
        />
        </Box>),
        },
        
      {

        accessorKey: 'reference', //access nested data with dot notation

        header: 'Référence',

        size: 150,

      },

      {

        accessorKey: 'designation',

        header: 'Désignation',

        size: 150,

      },

      {

        accessorKey: 'marque', //normal accessorKey

        header: 'Marque',

        size: 200,

      },

      {

        accessorKey: 'prix',

        header: 'Prix',

        size: 150,

      },

      {

        accessorKey: 'qtestock',

        header: 'State',

        size: 150,

      },
      {
        accessorKey: '_id',
        header: 'actions',
        size: 100,
        Cell: ({ cell, row }) => (
        <div >
         <Button
        onClick={()=>{setArticle(cell.row.original);handleShow()}}
        variant="warning"
        size="md"
        className="text-warning btn-link edit"
        >
        <i className="fa-solid fa-pen-to-square"></i>
        </Button>
        <Button
        onClick={(e) => {
          deleteProduct(cell.row.original._id,cell.row.original.reference, e);
        }}
        variant="danger"
        size="md"
        className="text-danger btn-link delete"
        >
        <i className="fa fa-trash" />
        </Button>
        </div>
        ),
        },
    ],

    [products]

  );

  const table = useMaterialReactTable({
    columns,
    data :products,
    enableRowSelection: true,
    getRowId: (row) => row.phoneNumber,
    initialState: { showColumnFilters: true },
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
  });

  return <div>
  
  <Insertarticle addproduct={addproduct}/>
  <MaterialReactTable table={table} />;
  {show ? <Editarticle art={article} updateProduct={updateProduct} show={true} setShow={setShow} /> : null}
  </div>
};

export default ArticleList
