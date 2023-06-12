import './App.css';
import {useState} from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'

function App() {

  const [nombre, setNombre]=useState("");
  const [edad, setEdad]=useState(0);
  const [pais, setPais]=useState("");
  const [cargo, setCargo]=useState("");
  const [antiguedad, setAntiguedad]=useState(0);
  const [id, setId]=useState(0);

  const [editar, setEditar]=useState(false);

  const [empleadosList,setEmpleados]= useState([])

  const add = ()=>{
    Axios.post("http://localhost:3001/create", {
      nombre:nombre, 
      edad:edad,
      pais:pais,
      cargo:cargo,
      antiguedad:antiguedad
    }).then(()=>{
      getEmpleados();
      Cancelar();
      Swal.fire({
        title: "<strong>Registro éxitoso</strong>",
        html: "<i>El empleado <strong>"+nombre+"</strong> ha sido registrado con éxito</i>",
        icon: 'success',
        timer: 3000
      })
    });
  }

  const update = ()=>{
    Axios.put("http://localhost:3001/update", {
      id:id, 
      nombre:nombre, 
      edad:edad,
      pais:pais,
      cargo:cargo,
      antiguedad:antiguedad
    }).then(()=>{
      getEmpleados();
      Cancelar();
      Swal.fire({
        title: "<strong>Actualización éxitosa</strong>",
        html: "<i>El empleado <strong>"+nombre+"</strong> ha sido actualizado con éxito</i>",
        icon: 'success',
        timer: 3000
      })
    });
  }

  const delDato = (val)=>{

    Swal.fire({
      title: 'Confirmar eliminación?',
      html: "<i>Realmente desea eliminar a <strong>"+val.nombre+"</strong>?</i>",
      buttons: ["No","Si"],
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(()=>{
          getEmpleados();
          Cancelar();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: val.nombre+' fue eliminado.',
            showConfirmButton: false,
            timer: 2000
          });
        });
        
      }
    });
  }
  
  const Cancelar = ()=>{
    setAntiguedad("");
    setNombre("");
    setCargo("");
    setEdad("");
    setPais("");
    setId("");
    setEditar(false);
  }

    const editarEmpleado = (val)=>{
      setEditar(true);

      setNombre(val.nombre);
      setEdad(val.edad);
      setCargo(val.cargo);
      setPais(val.pais);
      setAntiguedad(val.antiguedad);
      setId(val.id);
    }

  const getEmpleados = ()=>{
    Axios.get("http://localhost:3001/empleados").then((response)=>{
      setEmpleados(response.data);
    });
  }

  getEmpleados();

  return (
    <div className="container">

    <div className="card text-center">
      <div className="card-header">
        Gestión Usuarios
      </div>
      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre:</span>
          <input type="text" value={nombre}
          onChange={(event)=>{
            setNombre(event.target.value);
          }}
          className="form-control" placeholder="Ingrese Nombre" aria-label="Nombre" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Edad:</span>
          <input type="number" value={edad}
          onChange={(event)=>{
            setEdad(event.target.value);
          }}
          className="form-control" placeholder="Ingrese edad" aria-label="Edad" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">País:</span>
          <input type="text" value={pais} 
          onChange={(event)=>{
            setPais(event.target.value);
          }}
          className="form-control" placeholder="Ingrese país" aria-label="País" aria-describedby="basic-addon1"/>
        </div>
    
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Cargo:</span>
          <input type="text"  value={cargo}
          onChange={(event)=>{
            setCargo(event.target.value);
          }}
          className="form-control" placeholder="Ingrese cargo" aria-label="Cargo" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Antiguedad:</span>
          <input type="number" value={antiguedad}
          onChange={(event)=>{
            setAntiguedad(event.target.value);
          }}
          className="form-control" placeholder="Ingrese antiguedad" aria-label="Antiguedad" aria-describedby="basic-addon1"/>
        </div>
        
      </div>
      <div className="card-footer text-muted">
        {
          editar? 
          <div>
          <button className='btn btn-warning m-2' onClick={update}>actualizar</button>       
          <button className='btn btn-info m-2' onClick={Cancelar}>Cancelar</button>
          </div>
          :<button className='btn btn-success' onClick={add}>Guardar</button>
        }
      </div>
    </div>

    <table className="table table-striped">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Edad</th>
          <th scope="col">Pais</th>
          <th scope="col">Cargo</th>
          <th scope="col">Experiencia</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
      {
          empleadosList.map((val,key)=>{
            return<tr key={val.id}>
                    <th>{val.id}</th>
                    <td>{val.nombre}</td>
                    <td>{val.edad}</td>
                    <td>{val.pais}</td>
                    <td>{val.cargo}</td>
                    <td>{val.antiguedad}</td>
                    <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" 
                      onClick={()=>{
                        editarEmpleado(val);
                      }}
                      className="btn btn-info">Editar</button>
                      <button type="button" onClick={()=>{
                        delDato(val);
                      }} className="btn btn-danger">Eliminar</button>
                    </div>
                    </td>
                  </tr>
          })
        }
      </tbody>
    </table>

    </div>
  );
}

export default App;
