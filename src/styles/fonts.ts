import { Fira_Sans, Montserrat } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["cyrillic"],
});
export const firaSans = Fira_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["cyrillic"],
});
