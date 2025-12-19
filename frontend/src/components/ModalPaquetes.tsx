import { createPortal } from "react-dom";
import IconoCerrar from "../../public/svg/IconoCerrar";

type props = {
  abierto: boolean;
  setAbierto: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  titulo: string | undefined;
  classNameOverlay?: string;
  classNameModal?: string;
};

const Modal = ({
  abierto,
  setAbierto,
  children,
  setId,
  titulo,
  classNameOverlay,
  classNameModal,
}: props) => {
  if (!abierto) return null;
  return createPortal(
    <section>
      <div
        className={
          classNameOverlay ||
          `fixed top-0 right-0 bottom-0 left-0 z-20 h-lvh w-screen bg-black opacity-55`
        }
      ></div>
      <article
        className={
          classNameModal ||
          `fixed top-10 left-20 z-30 flex h-[85vh] w-[85vw] flex-col overflow-y-auto rounded-md bg-white`
        }
      >
        <section className="sticky top-0 flex w-full items-center justify-center bg-white shadow-md">
          <h1 className="flex-1 text-center">{titulo}</h1>
          <button
            className="rounded-full border-2 border-red-200 p-2 hover:bg-red-100"
            onClick={() => {
              setAbierto(false);
              setId(null);
            }}
          >
            <IconoCerrar />
          </button>
        </section>
        <main className="mt-2 px-8 pb-4">{children}</main>
      </article>
    </section>,
    document.getElementById("portales") as any,
  );
};
export default Modal;
