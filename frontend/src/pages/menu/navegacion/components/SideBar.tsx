import Links from "./Links";
import {
  useIdentificacion,
  useIdentificacionCerrarSesion,
} from "../../../login/hookIdentificacion";
import IconoCerrarSesion from "../../../../../public/svg/IconoCerrarSesion";
import IconoCargando from "../../../../../public/svg/IconoCargando";

type props = {
  setActivo: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBar = ({ setActivo }: props) => {
  const { data: empleado } = useIdentificacion();
  const { isPending, mutate } = useIdentificacionCerrarSesion();

  return (
    <>
      <figure className="mb-4">
        <img src="icono-principal.svg" alt="Icono principal" width={80} />
      </figure>
      <Links setActivo={setActivo} />
      <article className="mt-8 mb-8 flex items-center gap-2">
        <figure className="size-15 rounded-full bg-white"></figure>
        <section>
          <h1 className="text-base">{empleado?.objeto?.Nombres}</h1>
          <h2 className="text-sm italic">{empleado?.objeto?.roles.Nombre}</h2>
        </section>
      </article>
      <button
        className="flex items-center gap-4 p-4 text-sm hover:bg-red-100 disabled:w-full disabled:cursor-not-allowed disabled:bg-red-100 sm:w-full"
        disabled={isPending}
        onClick={() => mutate()}
      >
        {isPending ? (
          <div className="flex w-full justify-center">
            <IconoCargando boton={true} />
          </div>
        ) : (
          <>
            <IconoCerrarSesion />
            <p>Cerrar sesion</p>
          </>
        )}
      </button>
    </>
  );
};
export default SideBar;
