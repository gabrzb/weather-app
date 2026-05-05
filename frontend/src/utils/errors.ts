export function errorMessage(caught: unknown) {
  return caught instanceof Error ? caught.message : 'Falha inesperada ao consultar a API.'
}
