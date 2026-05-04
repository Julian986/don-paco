/**
 * Tarjeta de crédito: precio base + 10%.
 * Efectivo / transferencia: usa la base cuando no hay monto aparte en `cash`.
 */
export function precioTarjetaDesdeLista(precioBaseLista: number) {
  return Math.round(precioBaseLista * 1.1);
}

/** Inverso de `precioTarjetaDesdeLista`: el monto con tarjeta que ve el cliente → base guardada en BD (`lista`). */
export function listaDesdePrecioTarjeta(precioTarjeta: number) {
  if (!Number.isFinite(precioTarjeta) || precioTarjeta < 0) return 0;
  return Math.max(0, Math.round(precioTarjeta / 1.1));
}

export function precioEfectivoTransfer(precioLista: number, efectivoTransfer: number | null) {
  if (efectivoTransfer === null || Number.isNaN(efectivoTransfer)) {
    return precioLista;
  }
  return efectivoTransfer;
}
