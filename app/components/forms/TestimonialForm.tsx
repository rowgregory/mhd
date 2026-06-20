import { TestimonialFormProps } from "@/types/testimonial.types";
import { Field, inputCls } from "../ui/Field";

export function TestimonialForm({
  form,
  setForm,
  error,
  setOpen,
  save,
  pending,
  editing,
}: TestimonialFormProps) {
  return (
    <div className="space-y-4">
      <Field label="Name" required>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputCls}
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Title">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Owner"
            className={inputCls}
          />
        </Field>
        <Field label="Company">
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className={inputCls}
          />
        </Field>
      </div>
      <Field label="Quote" required>
        <textarea
          value={form.quote}
          onChange={(e) => setForm({ ...form, quote: e.target.value })}
          rows={4}
          className={`${inputCls} resize-y`}
        />
      </Field>
      <div className="grid grid-cols-2 items-end gap-3">
        <Field label="Order">
          <input
            type="number"
            value={form.order}
            onChange={(e) =>
              setForm({ ...form, order: Number(e.target.value) })
            }
            className={inputCls}
          />
        </Field>
        <label className="flex items-center gap-2 py-2 font-sans text-sm text-admin-fg">
          <input
            type="checkbox"
            checked={form.isVisible}
            onChange={(e) => setForm({ ...form, isVisible: e.target.checked })}
            className="h-4 w-4 accent-admin-accent"
          />
          Visible on site
        </label>
      </div>

      {error && (
        <p
          role="alert"
          className="border border-danger/30 bg-danger-surface px-3 py-2 font-sans text-xs text-danger"
        >
          {error}
        </p>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="border border-admin-line px-4 py-2 font-sans text-sm text-admin-fg-muted transition-colors hover:text-admin-fg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={save}
          disabled={pending}
          className="bg-admin-fg px-4 py-2 font-sans text-sm text-admin-bg transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-admin-accent disabled:opacity-60"
        >
          {pending ? "Saving…" : editing ? "Save changes" : "Add"}
        </button>
      </div>
    </div>
  );
}
