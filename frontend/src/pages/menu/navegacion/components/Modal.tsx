import { createPortal } from "react-dom";
import IconoCerrar from "../../../../../public/svg/IconoCerrar";

type props = {
  activo: boolean;
  setActivo: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const Modal = ({ activo, setActivo, children }: props) => {
  if (!activo) return null;
  return createPortal(
    <figure>
      <div className="fixed top-0 right-0 bottom-0 left-0 z-20 h-lvh w-screen bg-black opacity-55"></div>
      <article className="fixed top-0 left-0 z-30 flex h-screen w-screen flex-col overflow-y-auto rounded-md bg-slate-100">
        <header className="flex">
          <figure
            className="rounded-md p-4 hover:cursor-pointer active:bg-slate-200"
            onClick={() => setActivo(false)}
          >
            <IconoCerrar />
          </figure>
        </header>
        <main className="mt-2 px-8 pb-4">{children}</main>
      </article>
    </figure>,
    document.getElementById("portales") as any,
  );
};
export default Modal;
