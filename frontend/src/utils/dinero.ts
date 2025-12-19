export const getFormatoNumerico = (numero: number | string) => {
  try {
    if (typeof numero === "string") {
      return new Intl.NumberFormat().format(Number(numero));
    }
    return new Intl.NumberFormat().format(numero);
  } catch (error) {
    console.error(error);
  }
};
