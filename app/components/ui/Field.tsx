export const inputCls =
  "w-full border border-admin-line bg-admin-bg px-3 py-2 font-sans text-sm text-admin-fg outline-none transition-colors focus:border-admin-accent";

export function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-sans text-xs font-medium text-admin-fg-muted">
        {label}
        {required && <span className="text-admin-accent"> *</span>}
      </span>
      {children}
    </label>
  );
}
