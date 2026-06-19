import { Collection, Offering, Project, Service } from "@/types/home.types";
import { Trees, Hammer, Ruler, PackageCheck } from "lucide-react";

export const SERVICES: Service[] = [
  {
    icon: Ruler,
    title: "Design & Measure",
    blurb: "On-site templating to the millimeter.",
  },
  {
    icon: Trees,
    title: "Material Selection",
    blurb: "Hand-picked hardwoods and veneers.",
  },
  {
    icon: Hammer,
    title: "Custom Build",
    blurb: "Joinery cut and finished in-shop.",
  },
  {
    icon: PackageCheck,
    title: "Install & Finish",
    blurb: "Fitted, leveled, and signed off.",
  },
];

export const COLLECTIONS: Collection[] = [
  {
    img: "/images/collection-1.jpg",
    alt: "Shaker-style kitchen cabinetry in painted maple",
    name: "The Marblehead",
    style: "Shaker · painted maple",
    href: "/contact?collection=marblehead",
  },
  {
    img: "/images/collection-2.jpg",
    alt: "Flat-panel walnut cabinetry with integrated pulls",
    name: "The Atlantic",
    style: "Flat panel · walnut",
    href: "/contact?collection=atlantic",
  },
  {
    img: "/images/collection-3.jpg",
    alt: "Beaded inset white oak cabinetry, traditional detailing",
    name: "The Heritage",
    style: "Beaded inset · white oak",
    href: "/contact?collection=heritage",
  },
];

export const ITEMS = [
  { n: "01", label: "Design consultation" },
  { n: "02", label: "Shop fabrication" },
  { n: "03", label: "On-site installation" },
];

export const OFFERINGS: Offering[] = [
  {
    img: "/images/work-1.jpg",
    alt: "Custom hardwood kitchen cabinetry installed in a bright home",
    title: "Kitchens & Cabinetry",
    blurb: "Full custom kitchens, islands, and storage built to your space.",
    href: "/services/kitchens",
  },
  {
    img: "/images/work-2.jpg",
    alt: "A craftsman fitting a built-in shelving unit",
    title: "Built-Ins & Millwork",
    blurb: "Shelving, wall units, and trim that look original to the room.",
    href: "/services/built-ins",
  },
  {
    img: "/images/work-3.jpg",
    alt: "Stacked finished hardwood panels in the workshop",
    title: "Commercial Casework",
    blurb: "Durable, precise cabinetry for offices, retail, and hospitality.",
    href: "/services/commercial",
  },
];

export const PROJECTS: Project[] = [
  {
    img: "/images/work-1.jpg",
    alt: "Walnut kitchen with waterfall island",
    title: "Marblehead Kitchen",
    meta: "Walnut · 2025",
  },
  {
    img: "/images/work-2.jpg",
    alt: "Floor-to-ceiling white oak built-ins",
    title: "Swampscott Library",
    meta: "White oak · 2025",
  },
  {
    img: "/images/work-3.jpg",
    alt: "Curved reception desk in maple",
    title: "Lynn Reception Desk",
    meta: "Maple · 2024",
  },
  {
    img: "/images/work-4.jpg",
    alt: "Custom mudroom lockers and bench",
    title: "Nahant Mudroom",
    meta: "Painted poplar · 2024",
  },
  {
    img: "/images/work-5.jpg",
    alt: "Floating vanity with integrated lighting",
    title: "Salem Vanity",
    meta: "Rift oak · 2024",
  },
  {
    img: "/images/work-6.jpg",
    alt: "Built-in home office with fluted cabinet doors",
    title: "Beverly Home Office",
    meta: "Cherry · 2024",
  },
];
