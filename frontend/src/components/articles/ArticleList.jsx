import React from 'react'
import { useMemo } from 'react';
import { MaterialReactTable,useMaterialReactTable} from 'material-react-table';
import { Box } from '@mui/material';
import Button from 'react-bootstrap/Button';

const ArticleList = ({products,deleteProduct}) => {


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
            onClick={() => {
            console.log("modification ...")
            }}
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
    
       data: products, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    
      });
  return (
    <div>
      <MaterialReactTable table={table} />;
    </div>
  )
}

export default ArticleList
