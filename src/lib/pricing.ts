/**
 * Tarjeta de crédito: precio de lista + 10% (nota de Mica).
 * Efectivo / transferencia: precio lista cuando no hay columna separada.
 */
export function precioTarjetaDesdeLista(precioLista: number) {
  return Math.round(precioLista * 1.1);
}

export function precioEfectivoTransfer(precioLista: number, efectivoTransfer: number | null) {
  if (efectivoTransfer === null || Number.isNaN(efectivoTransfer)) {
    return precioLista;
  }
  return efectivoTransfer;
}
