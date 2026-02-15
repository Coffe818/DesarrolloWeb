import { useState } from "react";

const RegistroHotel = () => {
  const [formData, setFormData] = useState({
    identificacion: "",
    nombre: "",
    apellidos: "",
    telefono: "",
    habitacion: "",
    rh: "",
    fechaIngreso: "",
    fechaSalida: "",
  });

  const setValor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validar = () => {
    const valores = Object.values(formData);

    const estaIncompleto = valores.some((valor) => valor.trim() === "");

    if (estaIncompleto) {
      alert("⚠️ Error: Todos los campos son obligatorios.");
    } else {
      alert("✅ Registro exitoso para: " + formData.nombre);
      console.log("Datos enviados:", formData);
    }
  };
  const limpiar = () => {
    setFormData({
      identificacion: "",
      nombre: "",
      apellidos: "",
      telefono: "",
      habitacion: "",
      rh: "",
      fechaIngreso: "",
      fechaSalida: "",
    });
  };

  return (
    <div className="container" style={{ maxWidth: "600px", marginTop: "2rem" }}>
      <div className="card">
        <div className="card-header">
          <div className="row align-items-center">
            <h5 className="col text-center text-danger">Registro Hotel</h5>
            <button
              type="button"
              className="btn-close btn-outline-danger col-auto"
            ></button>
          </div>
        </div>

        <div className="card-body px-4 pb-4">
          <form>
            <div className="mb-3 row align-items-center">
              <label className="col-4 col-form-label">Identificacion:</label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  value={formData.identificacion}
                  onChange={setValor}
                  name="identificacion"
                />
              </div>
            </div>

            <div className="mb-3 row align-items-center">
              <label className="col-4 col-form-label">Nombre:</label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  value={formData.nombre}
                  onChange={setValor}
                  name="nombre"
                />
              </div>
            </div>
            <div className="mb-3 row align-items-center">
              <label className="col-4 col-form-label">Apellidos:</label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  value={formData.apellidos}
                  onChange={setValor}
                  name="apellidos"
                />
              </div>
            </div>
            <div className="mb-3 row align-items-center">
              <label className="col-4 col-form-label">Telefono:</label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  value={formData.telefono}
                  onChange={setValor}
                  name="telefono"
                />
              </div>
            </div>
            <div className="mb-3 row align-items-center">
              <label className="col-4 col-form-label">Habitacion:</label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  value={formData.habitacion}
                  onChange={setValor}
                  name="habitacion"
                />
              </div>
            </div>
            <div className="mb-3 row align-items-center">
              <label className="col-4 col-form-label">RH:</label>
              <div className="col-3">
                <input
                  type="text"
                  className="form-control"
                  value={formData.rh}
                  onChange={setValor}
                  name="rh"
                />
              </div>
            </div>

            <div className="d-flex justify-content-center gap-2 mb-4">
              <div className="col-6">
                <label className="form-label">Fecha Ingreso:</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.fechaIngreso}
                  onChange={setValor}
                  name="fechaIngreso"
                />
              </div>
              <div className="col-6">
                <label className="form-label">Fecha Salida:</label>
                <input
                  type="date"
                  className="form-control "
                  value={formData.fechaSalida}
                  onChange={setValor}
                  name="fechaSalida"
                />
              </div>
            </div>

            <div className="d-flex justify-content-center gap-2 mb-4">
              <button type="button" className="btn btn-light ">
                ⬅️
              </button>
              <button type="button" className="btn btn-light">
                ➡️
              </button>
            </div>

            <div className="d-flex justify-content-around">
              <button
                type="button"
                className="btn btn-info  px-4"
                onClick={validar}
              >
                Registrar
              </button>
              <button
                type="button"
                className="btn btn-danger px-4"
                onClick={limpiar}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroHotel;
