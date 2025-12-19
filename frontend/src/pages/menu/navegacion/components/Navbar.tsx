import IconoHamburguesa from "../../../../../public/svg/IconoHamburguesa";
import Modal from "./Modal";
import SideBar from "./SideBar";

type props = {
  setActivo: React.Dispatch<React.SetStateAction<boolean>>;
  activo: boolean;
};

const Navbar = ({ setActivo, activo }: props) => {
  return (
    <>
      <figure
        className="mr-5 rounded-md p-4 hover:cursor-pointer active:bg-slate-200"
        onClick={() => setActivo(true)}
      >
        <IconoHamburguesa />
      </figure>

      <Modal activo={activo} setActivo={setActivo}>
        <div className="flex flex-col items-center">
          <SideBar setActivo={setActivo} />
        </div>
      </Modal>
    </>
  );
};
export default Navbar;
