// Types
import { InputProps } from "../types/search";

export function useSearchInputs() {
  const searchInputs: InputProps = [
    {
      label: "Trier par",
      name: "sort",
      options: [
        { value: "", label: "Select" },
        { value: "Name ascending", label: "Nom (A-Z)" },
        { value: "Name descending", label: "Nom (Z-A)" },
        { value: "Population descending", label: "Population (9-1)" },
        { value: "Population ascending", label: "Population (1-9)" },
      ],
    },
    {
      label: "Continent",
      name: "region",
      options: [
        { value: "", label: "Select" },
        { value: "Africa", label: "Afrique" },
        { value: "Americas", label: "Amérique" },
        { value: "Asia", label: "Asie" },
        { value: "Europe", label: "Europe" },
        { value: "Oceania", label: "Océanie" },
      ],
    },
    {
      label: "Population",
      name: "population",
      options: [
        { value: 0, label: "Tous" },
        { value: 1_000_000_000, label: "> 1 billion" },
        { value: -1_000_000_000, label: "< 1 billion" },
        { value: 100_000_000, label: "> 100 million" },
        { value: -100_000_000, label: "< 100 million" },
        { value: 1_000_000, label: "> 1 million" },
        { value: -1_000_000, label: "< 1 million" },
        { value: 100_000, label: "> 100k" },
        { value: -100_000, label: "< 100k" },
      ],
    },
  ];

  return { searchInputs };
}
