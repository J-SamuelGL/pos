import type { TRespuestaProductoBuscar } from "../../../../../inventario/productos/api/productos.schema";
import { useVenta } from "../../../../api/ventas/venta.store";
import { type TDetalleVentaStore } from "../../../../api/ventas/venta.store";
import { puedeComprar } from "./Pie";
import { esPaquete, type bien } from "./DetallesProducto";

type props = {
  entero: string;
  setEntero: React.Dispatch<React.SetStateAction<string>>;
  seleccionarDefault?: boolean;
  maximo?: string;
  bien: TDetalleVentaStore;
  cantidad: string;
  producto: TRespuestaProductoBuscar;
  // es para sacar sus unidades totales
  bienOriginal: bien;
};

const getEquivalente = (bien: bien, cantidad: number) => {
  if (esPaquete(bien)) {
    console.log(bien.UnidadesTotales * cantidad);
    return bien.UnidadesTotales * cantidad;
  }
  return undefined;
};

const InputCantidad = ({
  entero,
  setEntero,
  seleccionarDefault,
  maximo,
  bien,
  producto,
  bienOriginal,
}: props) => {
  const { actualizarCantidadBien: actualizarCantidad, DetallesVenta } =
    useVenta((estado) => estado);

  const manejarEntero = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input === "") {
      setEntero("");
      return;
    }
    const number = parseInt(input);
    const equivalente = getEquivalente(bienOriginal, Number(input));
    if (
      !isNaN(number) &&
      number > 0 &&
      number.toString() === input &&
      puedeComprar(bien, DetallesVenta, Number(input), producto, bienOriginal)
    ) {
      actualizarCantidad(bien, Number(input), equivalente);
      setEntero(input);
    }
  };

  const bloquearTeclas = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "." || e.key === "-" || e.key === "e" || e.key === "+") {
      e.preventDefault();
    }
  };

  return (
    <fieldset>
      <input
        type="number"
        className="inputForm mb-0 w-20"
        autoFocus={seleccionarDefault ? true : false}
        value={entero}
        onChange={(e) => {
          manejarEntero(e);
        }}
        onKeyDown={(e) => {
          bloquearTeclas(e);
        }}
        max={maximo}
      />
    </fieldset>
  );
};
export default InputCantidad;
