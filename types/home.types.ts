import { LucideIcon } from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: string;
  blurb: string;
};

export type Collection = {
  img: string;
  alt: string;
  name: string;
  style: string;
  href: string;
};

export type Offering = {
  img: string;
  alt: string;
  title: string;
  blurb: string;
  href: string;
};

export type Project = {
  img: string;
  alt: string;
  title: string;
  meta: string;
};
