import { Offering, Project, Service } from "@/types/home.types";
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

export const PROJECT_TYPES = [
  {
    img: "/images/type-kitchen.jpeg",
    alt: "Custom kitchen cabinetry",
    name: "Kitchens",
    style: "The heart of the home",
    href: "/portfolio",
  },
  {
    img: "/images/type-builtins.jpeg",
    alt: "Built-in shelving and cabinetry",
    name: "Built-Ins",
    style: "Shelving, nooks, window seats",
    href: "/portfolio",
  },
  {
    img: "/images/type-bath.jpeg",
    alt: "Custom bathroom vanity",
    name: "Bath & Vanities",
    style: "Vanities and linen storage",
    href: "/portfolio",
  },
  {
    img: "/images/type-mudroom.jpg",
    alt: "Mudroom lockers and bench",
    name: "Mudrooms",
    style: "Lockers, benches, cubbies",
    href: "/portfolio",
  },
  {
    img: "/images/type-office.jpeg",
    alt: "Home office built-in desk and shelving",
    name: "Offices & Libraries",
    style: "Desks, bookcases, storage",
    href: "/portfolio",
  },
  {
    img: "/images/type-closet.jpg",
    alt: "Fitted closet and wardrobe system",
    name: "Closets",
    style: "Fitted wardrobes and storage",
    href: "/portfolio",
  },
] as const;

export const ITEMS = [
  { n: "01", label: "Design consultation" },
  { n: "02", label: "On-site installation" },
];

export const OFFERINGS: Offering[] = [
  {
    img: "/images/inset.jpg",
    alt: "Inset cabinetry with doors set flush inside the face frame",
    title: "Inset",
    subtitle: "Flush-set doors",
    blurb:
      "Doors and drawers set flush within the frame for tight, even reveals. The most exacting style we build — traditional, refined, and unmistakably handcrafted.",
    href: "/portfolio",
  },
  {
    img: "/images/overlay.jpg",
    alt: "Full overlay cabinetry with clean, modern door fronts",
    title: "Overlay",
    subtitle: "Clean & modern",
    blurb:
      "Door fronts that sit over the frame for clean lines and a contemporary feel. Versatile and timeless, tailored to the proportions of your space.",
    href: "/portfolio",
  },
  {
    img: "/images/pencil-bead.jpg",
    alt: "Beaded inset cabinetry with a fine pencil bead detail around each opening",
    title: "Pencil Bead",
    subtitle: "Beaded detail",
    blurb:
      "Inset construction with a delicate bead routed around every opening. A classic, detail-rich touch that brings warmth and character to a room.",
    href: "/portfolio",
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
