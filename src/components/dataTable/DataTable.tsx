import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";


type Props = {
  columns:GridColDef[];
  rows:object[];
  slug:string;
}



const DataTable = (props:Props) => {

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn:(id:number)=>{
      return fetch(`http://localhost:8800/api/${props.slug}/${id}`,{method: "delete",
    });
    },
    onSuccess:()=>{
      queryClient.invalidateQueries([`all${props.slug}`]);
    }
  })

const handleDelete = (id:number) => { 
  //delte the item
  //axios.delete(`/api/users/`+id)
  mutation.mutate(id)

}
  const actionColumn:GridColDef = {
    field: "actions",
    headerName: "Actions",
    width: 200,
    renderCell: (params) => (
      <div className="actions">
        <Link to={`/${props.slug}/${params.row.id}`}>
      <img src="/view.svg" alt="" />
        </Link>
      <div className="delete" onClick={()=>handleDelete(params.row.id)}>
        <img src="/delete.svg" alt="" />
      </div>
      </div>
    ),
  }

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
      />
    </div>
  );
};

export default DataTable;
