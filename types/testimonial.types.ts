import { Dispatch, SetStateAction } from "react";

export type TestimonialRecord = {
  id: string;
  name: string;
  title: string | null;
  company: string | null;
  quote: string;
  order: number;
  isVisible: boolean;
};

export type TestimonialInput = {
  name: string;
  title?: string | null;
  company?: string | null;
  quote: string;
  order?: number;
  isVisible?: boolean;
};

export type Props = { initial: TestimonialRecord[] };

export type Result<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

export type TestimonialFormState = {
  name: string;
  title: string;
  company: string;
  quote: string;
  order: number;
  isVisible: boolean;
};

export interface TestimonialFormProps {
  form: TestimonialFormState;
  setForm: Dispatch<SetStateAction<TestimonialFormState>>;
  error: string | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
  save: () => void;
  pending: boolean;
  editing: TestimonialRecord | null;
}
