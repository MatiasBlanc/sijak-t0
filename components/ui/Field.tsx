import type { ReactNode } from 'react';
import { cn } from './cn';

interface FieldProps {
  label: string;
  name: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

/** Campo con etiqueta, control y error inline asociado por `aria-describedby`. */
export function Field({ label, name, error, children, className }: FieldProps) {
  return (
    <label className={cn(error && 'field-invalid', className)} htmlFor={name}>
      {label}
      {children}
      {error ? (
        <span id={`${name}-error`} className="field-error">
          {error}
        </span>
      ) : null}
    </label>
  );
}

/** Atributos de accesibilidad que debe recibir el control de un `Field`. */
export function fieldProps(name: string, error?: string) {
  return {
    id: name,
    name,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${name}-error` : undefined,
  };
}
