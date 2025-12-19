import { useIdentificacion } from "../../pages/login/hookIdentificacion";
import IconoCargando from "../../../public/svg/IconoCargando";
import { useIdentificacionCerrarSesion } from "../../pages/login/hookIdentificacion";

const OffcanvasCuerpo = () => {
  const { data, isLoading } = useIdentificacion();
  const { isPending, mutate } = useIdentificacionCerrarSesion();

  if (isLoading) {
    return (
      <div className="centrar">
        <IconoCargando />
      </div>
    );
  }
  return (
    <>
      <article className="mt-16 mb-8">
        <h2 className="mb-2 italic underline decoration-slate-500 decoration-2 underline-offset-4">
          {data.objeto?.roles.Nombre}
        </h2>
        <h1>
          {data.objeto?.Nombres} {data.objeto?.Apellidos}
        </h1>
        <h2 className="text-base">{data.objeto?.Usuario}</h2>
      </article>

      <button
        disabled={isPending}
        className="botonPeligro w-full"
        onClick={() => {
          mutate();
        }}
      >
        {isPending ? (
          <span className="flex justify-center">
            <IconoCargando boton={true} />
          </span>
        ) : (
          "Cerrar sesion"
        )}
      </button>
    </>
  );
};
export default OffcanvasCuerpo;
