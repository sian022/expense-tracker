import USAFlag from "../assets/images/usa.png";
import PhilippinesFlag from "../assets/images/philippines.png";
import CanadaFlag from "../assets/images/canada.png";

const currencies = [
  {
    country: "USA",
    currency: "USD",
    flagSrc: USAFlag,
    conversionRate: 1,
    prefix: "$",
  },
  {
    country: "Philippines",
    currency: "PHP",
    flagSrc: PhilippinesFlag,
    conversionRate: 58.52,
    prefix: "₱",
  },
  {
    country: "Canada",
    currency: "CAD",
    flagSrc: CanadaFlag,
    conversionRate: 1.36,
    prefix: "CA$",
  },
];

export default currencies;
