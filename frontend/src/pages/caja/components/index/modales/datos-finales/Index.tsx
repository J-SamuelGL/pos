import Select from "react-select";
import { useClientes } from "../../../../hooks/hookClientes";
import IconoCargando from "../../../../../../../public/svg/IconoCargando";
import { useState } from "react";
import InputEntero from "../../../../../../components/InputEntero";
import { useVenta } from "../../../../api/ventas/venta.store";
import CrearCliente from "./CrearCliente";
import { useVentasCrear } from "../../../../hooks/hookVentas";
import { useIdentificacion } from "../../../../../login/hookIdentificacion";

type props = {
  setActivo: React.Dispatch<React.SetStateAction<boolean>>;
};

const DatosFinales = ({ setActivo }: props) => {
  const { data: clientes, isLoading: cargandoClientes } = useClientes();
  const {
    Total: totalVenta,
    DetallesVenta,
    limpiar,
  } = useVenta((estado) => estado);
  const { data: empleado } = useIdentificacion();
  const [monto, setMonto] = useState(String(totalVenta));
  const { mutate, isPending } = useVentasCrear();

  // datos modal
  // crear cliente
  type TSelectCliente = {
    label: string;
    value: string;
  };

  const [crear, setCrear] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] =
    useState<TSelectCliente | null>(null);

  if (!clientes || cargandoClientes || !empleado) {
    return (
      <div className="centrar">
        <IconoCargando />
      </div>
    );
  }

  const clientesSelect = clientes.objeto.map((cliente) => ({
    label: cliente.Nombres + " " + cliente.Apellidos,
    value: cliente.NIT,
  }));

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* NIT */}
        <div className="flex items-center gap-2">
          <>
            {crear ? (
              <div className="w-full">
                <CrearCliente
                  setCliente={setClienteSeleccionado}
                  setCrear={setCrear}
                />
              </div>
            ) : (
              <div className="w-full">
                <label>NIT</label>
                <div className="flex items-center gap-2">
                  <Select
                    className="w-full"
                    value={clienteSeleccionado}
                    onChange={(option) => setClienteSeleccionado(option)}
                    options={clientesSelect}
                    placeholder={"CF"}
                  />
                  <button
                    className="bg-slate-300 p-2 text-sm"
                    onClick={() => setCrear(true)}
                  >
                    Crear empleado
                  </button>
                </div>
              </div>
            )}
          </>
        </div>
        {/* monto */}
        <div>
          <label>Monto recibido</label>
          <InputEntero entero={monto} setEntero={setMonto} />
        </div>
        <h1 className="mb-4">
          Vuelto:{" "}
          {Number(monto) < totalVenta
            ? "El monto no es suficiente"
            : Number(monto) - totalVenta}
        </h1>
        <button
          disabled={Number(monto) < totalVenta || isPending}
          className="botonNeutral"
          onClick={() =>
            mutate(
              {
                EmpleadoID: empleado.objeto.EmpleadoID,
                NIT: clienteSeleccionado?.value,
                // omitiendo ProductoNombre y demas
                DetallesVenta: DetallesVenta.map((detalle) => ({
                  // quitando ProductoID si es un paquete
                  ProductoID: detalle.PaqueteID ? null : detalle.ProductoID,
                  PaqueteID: detalle.PaqueteID,
                  Cantidad: detalle.Cantidad,
                  PrecioVenta: detalle.PrecioVenta,
                  Subtotal: detalle.Subtotal,
                  Utilidad: detalle.Utilidad,
                })),
                FechaHora: new Date(),
                MontoRecibido: Number(monto),
                Total: totalVenta,
                Vuelto: Number(monto) - totalVenta,
              },
              {
                onSuccess: () => {
                  setActivo(false);
                  limpiar();
                },
              },
            )
          }
        >
          {isPending ? (
            <span className="flex justify-center">
              <IconoCargando boton={true} />
            </span>
          ) : (
            "Crear"
          )}
        </button>
      </form>
    </>
  );
};
export default DatosFinales;
