import { GridColDef } from "@mui/x-data-grid";
import "./add.scss"
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  slug:string;
  columns:GridColDef[];
  setOpen:React.Dispatch<React.SetStateAction<boolean>>;

}

const Add = (props: Props) => {

    const queryClient = useQueryClient();

    const mutation = useMutation({
      mutationFn: () => {
        return fetch(`http://localhost:8800/api/${props.slug}s`, { method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 1111,
        img:"",
        firstName: "Fred",
        lastName: "Flintstone",
        email: "test@emai.com",
        phone:"123456789",
        createdAt: "2021-09-01T20:00:00.000Z",
        verfied: true,
      }),
      });
      },
      onSuccess: () => {
        queryClient.invalidateQueries([`all${props.slug}s`]);
        props.setOpen(false);
      },
    });


  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //add new
    mutation.mutate();
  }

  return (
    <div className="add">
      <div className="modal">
        <span className="close"  onClick={()=>props.setOpen(false)}>X</span>
        <h1>Add New {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
          .filter(item=>item.field!=='id' && item.field!=='img')
          .map((column) => (
            <div className="item" key={column.field}>
              <label>{column.headerName}</label>
              <input type={column.type} placeholder={column.field} />
            </div>
          ))}
          <button>Submit</button>
        </form>
      </div>
    </div>
  ) 
}

export default Add