import type { Ref } from 'react';

interface FormAlertProps {
  title: string;
  messages: readonly string[];
  alertRef?: Ref<HTMLDivElement>;
}

/**
 * Aviso de error del formulario. Un solo `role="alert"` para no duplicar anuncios.
 */
export function FormAlert({ title, messages, alertRef }: FormAlertProps) {
  if (messages.length === 0) return null;
  return (
    <div ref={alertRef} className="form-alert" role="alert" tabIndex={-1}>
      <span className="form-alert-mark" aria-hidden="true">
        !
      </span>
      <p className="form-alert-title">{title}</p>
      <ul>
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
