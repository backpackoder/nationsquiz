type FormatedPopulation = {
  population: number;
  language: string;
};

export function formattedPopulation({ population, language }: FormatedPopulation) {
  const billions = Math.floor(population / 1_000_000_000);
  const millions = Math.floor((population - billions * 1_000_000_000) / 1_000_000);
  const thousands = Math.floor(
    (population - billions * 1_000_000_000 - millions * 1_000_000) / 1000
  );
  const ones = population - billions * 1_000_000_000 - millions * 1_000_000 - thousands * 1000;

  const formattedBillions = billions.toLocaleString(language);
  const formattedMillions = millions.toLocaleString(language);
  const formattedThousands = thousands.toLocaleString(language);
  const formattedOnes = ones.toLocaleString(language);

  const parts = [];
  if (billions > 0) {
    parts.push(formattedBillions);
  }
  if (millions > 0) {
    parts.push(formattedMillions.padStart(parts.length > 0 ? 3 : 0, "0"));
  }
  if (thousands > 0) {
    parts.push(formattedThousands.padStart(parts.length > 0 ? 3 : 0, "0"));
  }
  if (ones > 0) {
    parts.push(formattedOnes.padStart(parts.length > 0 ? 3 : 0, "0"));
  }

  const result = parts.join(language === "en" ? "." : ",");

  return result;
}
