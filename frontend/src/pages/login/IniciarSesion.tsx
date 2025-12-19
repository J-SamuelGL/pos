import { useState } from "react";
import { useIdentificacionLogeo } from "./hookIdentificacion.js";
import IconoCargando from "../../../public/svg/IconoCargando.js";

const IniciarSesion = () => {
  const [Usuario, setUsuario] = useState("");
  const [Clave, setClave] = useState("");

  const { isPending, mutate } = useIdentificacionLogeo();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center sm:grid sm:grid-cols-2 sm:p-3">
      <form className="flex h-full w-full flex-col items-center justify-center sm:items-center">
        <img
          src="icono-principal.svg"
          alt="Icono principal"
          width={100}
          height={100}
          className="mb-4 sm:hidden"
        />
        <h1 className="">Bienvenido!</h1>
        <p className="mb-8 text-xs">
          Ingrese sus datos para acceder al sistema
        </p>
        <fieldset className="flex w-full flex-col px-4">
          <label htmlFor="usuario" className="mb-1">
            Usuario
          </label>
          <input
            onChange={(e) => setUsuario(e.target.value)}
            value={Usuario}
            className="inputForm"
            autoFocus={true}
            id="usuario"
          />
          <label htmlFor="clave" className="mb-1">
            Clave
          </label>
          <input
            onChange={(e) => setClave(e.target.value)}
            value={Clave}
            className="inputForm mb-16"
            type="password"
            id="clave"
          />
          <button
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              mutate({ Usuario, Clave });
            }}
            className="botonNeutral"
          >
            {isPending ? (
              <span className="flex justify-center">
                <IconoCargando boton={true} />
              </span>
            ) : (
              "Enviar"
            )}
          </button>
        </fieldset>
      </form>
      <figure className="hidden sm:flex sm:h-full sm:flex-col sm:items-center sm:justify-center sm:rounded-lg sm:bg-sky-200">
        <img src="icono-principal.svg" alt="Icono principal" width={200} />
        <h1 className="text-secundario mb-4 text-4xl font-bold">Tienda July</h1>
        <h2>{new Date().getFullYear()}</h2>
      </figure>
    </main>
  );
};
export default IniciarSesion;
