type props = {
  entero: string;
  setEntero: React.Dispatch<React.SetStateAction<string>>;
  seleccionarDefault?: boolean;
  maximo?: string;
};

const InputEntero = ({
  entero,
  setEntero,
  seleccionarDefault,
  maximo,
}: props) => {
  const manejarEntero = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input === "") {
      setEntero("");
      return;
    }
    const number = parseInt(input);
    if (!isNaN(number) && number > 0 && number.toString() === input) {
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
        className="rounded-lg bg-slate-100 p-1 pl-2 transition delay-300 focus:ring-2 focus:ring-sky-600"
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
export default InputEntero;
