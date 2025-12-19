import { createPortal } from "react-dom";
import IconoCerrar from "../../../public/svg/IconoCerrar";

type props = {
  activo: boolean;
  setActivo: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  titulo: string;
};

const Offcanvas = ({ activo, setActivo, titulo, children }: props) => {
  if (!activo) return null;
  return createPortal(
    <section>
      <div
        className={`fixed top-0 right-0 bottom-0 left-0 z-20 h-lvh w-screen bg-black opacity-55`}
      ></div>
      <article
        className={`fixed top-0 left-0 z-30 flex h-[100vh] w-[40vw] flex-col overflow-y-auto rounded-md bg-white`}
      >
        <section className="sticky top-0 flex w-full items-center justify-center bg-white shadow-md">
          <h1 className="flex-1 text-center">{titulo}</h1>
          <button
            className="rounded-full border-2 border-red-200 p-2 hover:bg-red-100"
            onClick={() => {
              setActivo(false);
            }}
          >
            <IconoCerrar />
          </button>
        </section>
        <main className="h-full justify-center px-4 text-center">
          {children}
        </main>
      </article>
    </section>,
    document.getElementById("portales") as any,
  );
};
export default Offcanvas;
