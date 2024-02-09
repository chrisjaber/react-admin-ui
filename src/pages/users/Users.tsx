import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../../components/dataTable/DataTable'
import './users.scss'
import { useState } from 'react';
import Add from '../../components/add/Add';
import { useQuery } from '@tanstack/react-query';

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "img", headerName: "Avatar", width: 100, renderCell: (params) => <img src={(params.row.img as string) || "/noavatar.png"} alt="" /> },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    type: "string",
    width: 200,
    editable: true,
  },
  {
    field: "phone",
    headerName: "Phone",
    type: "number",
    width: 200,
    editable: true,
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 100,
    type: "boolean",
  },
];


const Users = () => {
  const [open, setOpen] = useState(false)

    const { isPending, data } = useQuery({
      queryKey: ["allUsers"],
      queryFn: () => fetch("http://localhost:8800/api/users").then((res) => res.json()),
    });

  return (
    <div className='users'>
      <div className="info">
        <h1>Users</h1>
        <button onClick={()=>setOpen(true)}>Add New User</button>
      </div>
      {isPending ? "Loading..." : <DataTable slug="Users" columns={columns} rows={data} />}
      {open && <Add slug="user" columns={columns} setOpen={setOpen}/>}
    </div>
  )
}

export default Users