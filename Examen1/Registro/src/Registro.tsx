import { useState } from "react";
import reactLogo from "./assets/react.svg";

const RegistroClientes = () => {
  const [formData, setFormData] = useState({
    numero: "",
    nombre: "",
    direccion: "",
    ciudad: "",
    estado: "",
    zip: "",
    fechaNacimiento: "",
    genero: "",
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
      alert("Error: Todos los campos son obligatorios.");
    } else {
      alert("Registro exitoso para: " + formData.nombre);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "80%", marginTop: "2rem" }}>
      <img src={reactLogo} alt="React logo" />

      <h1 className="text-center text-primary fs-1">My WebSite, Inc.</h1>

      <div className="card">
        <div className="card-header">
          <div className="row align-items-center">
            <h5 className="col text-center text-danger">
              Nota: todos los campos son obligatorios
            </h5>
          </div>
        </div>
        <div className="card-body px-4 pb-4">
          <div className="row">
            <div className="col mb-2">
              <form>
                <div className="mb-3 row align-items-center">
                  <label className="col-4 col-form-label">Accont No. :</label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      value={formData.numero}
                      onChange={setValor}
                      name="numero"
                    />
                  </div>
                </div>
                <div className="mb-3 row align-items-center">
                  <label className="col-4 col-form-label">Name:</label>
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
                  <label className="col-4 col-form-label">Address :</label>
                  <div className="col-8">
                    <div className="input-group align-items-center">
                      <input
                        type="text"
                        className="form-control"
                        value={formData.direccion}
                        onChange={setValor}
                        name="direccion"
                      />
                      <i className="m-2 bi bi-question-circle"></i>
                    </div>
                  </div>
                </div>
                <div className="mb-3 row align-items-center">
                  <label className="col-4 col-form-label">City:</label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      value={formData.ciudad}
                      onChange={setValor}
                      name="ciudad"
                    />
                  </div>
                </div>
                <div className="mb-3 row align-items-center">
                  <label className="col-2 col-form-label">State:</label>
                  <div className="col-4">
                    <input
                      type="text"
                      className="form-control"
                      value={formData.estado}
                      onChange={setValor}
                      name="estado"
                    />
                  </div>
                  <label className="col-2 col-form-label">Zip:</label>
                  <div className="col-4">
                    <input
                      type="text"
                      className="form-control"
                      value={formData.zip}
                      onChange={setValor}
                      name="zip"
                    />
                  </div>
                </div>
                <div className="mb-3 row align-items-center">
                  <label className="col-4 col-form-label">Birthday :</label>
                  <div className="col-8">
                    <input
                      type="date"
                      className="form-control"
                      value={formData.fechaNacimiento}
                      onChange={setValor}
                      name="fechaNacimiento"
                    />
                  </div>
                </div>
                <div className="mb-3 row align-items-center">
                  <label className="col-4 col-form-label">Sex:</label>
                  <div className="col-8">
                    <input
                      className="form-check-input m-1"
                      type="radio"
                      id="checkFamale"
                      value="Famale"
                      onChange={setValor}
                      name="genero"
                    />
                    <label className="form-check-label" htmlFor="checkFamale">
                      Famale
                    </label>
                    <input
                      className="form-check-input ms-3 m-1"
                      type="radio"
                      id="checkMale"
                      value="Male"
                      onChange={setValor}
                      name="genero"
                    />
                    <label className="form-check-label" htmlFor="checkMale">
                      Male
                    </label>
                  </div>
                </div>

                <div className="d-flex justify-content-around">
                  <button
                    type="button"
                    className="btn btn-info  px-4"
                    onClick={validar}
                  >
                    Registrar
                  </button>
                </div>
              </form>
            </div>
            <div className="col">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                placeat fugiat impedit dicta eveniet, error quas tempora
                corrupti magnam optio cum illo accusantium in maxime
                perspiciatis officia vero expedita! Nesciunt.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                placeat fugiat impedit dicta eveniet, error quas tempora
                corrupti magnam optio cum illo accusantium in maxime
                perspiciatis officia vero expedita! Nesciunt.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                placeat fugiat impedit dicta eveniet, error quas tempora
                corrupti magnam optio cum illo accusantium in maxime
                perspiciatis officia vero expedita! Nesciunt. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Itaque id consequuntur
                quibusdam eligendi aliquid harum. Itaque quibusdam autem dolor
                eum facere voluptate quod quo ad dolorem ut, iusto adipisci
                doloribus magnam exercitationem voluptatem odit fugiat minus
                reprehenderit aliquid dicta. Itaque obcaecati dicta ipsam totam
                saepe architecto rerum pariatur consequatur maxime, dolorum
                eligendi iure iusto asperiores
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroClientes;
