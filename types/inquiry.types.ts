export type ContactInput = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  /** Honeypot — must be empty. Bots fill hidden fields; humans don't see it. */
  _trap?: string;
};
