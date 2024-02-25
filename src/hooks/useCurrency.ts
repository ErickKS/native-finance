export function useCurrency(value: number) {
  const formatUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatUSD.format(value);
}
