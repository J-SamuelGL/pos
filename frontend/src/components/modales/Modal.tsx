import { createPortal } from "react-dom";
import IconoCerrar from "../../../public/svg/IconoCerrar";

type props = {
  titulo: string | undefined;
  activo: boolean;
  setActivo: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  classNameOverlay?: string;
  classNameModal?: string;
};

const Modal = ({
  activo,
  setActivo,
  children,
  titulo,
  classNameOverlay,
  classNameModal,
}: props) => {
  if (!activo) return null;
  return createPortal(
    <aside>
      {/* overlay */}
      <div
        className={
          classNameOverlay ||
          `fixed top-0 right-0 bottom-0 left-0 z-20 h-lvh w-screen bg-black opacity-55`
        }
      ></div>
      {/* modal */}
      <dialog
        className={
          classNameModal ||
          `fixed top-10 z-30 flex h-screen w-screen flex-col overflow-y-auto rounded-md bg-white sm:top-10 sm:left-20 sm:h-[85vh] sm:w-[85vw]`
        }
      >
        <header className="sticky top-0 flex w-full items-center justify-center bg-white shadow-md">
          <h1 className="flex-1 text-center">{titulo}</h1>
          <button
            className="rounded-md p-2"
            onClick={() => {
              setActivo(false);
            }}
          >
            <IconoCerrar />
          </button>
        </header>
        <article className="mt-2 px-8 pb-4">{children}</article>
      </dialog>
    </aside>,
    document.getElementById("portales") as HTMLElement,
  );
};
export default Modal;
