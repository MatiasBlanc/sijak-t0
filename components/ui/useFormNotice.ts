'use client';

import { useEffect, useRef, useState } from 'react';
import { formErrorMessages, type FormErrorCopy, type FormFailure } from '@/lib/form';

/**
 * Estado visible de un formulario: envío, campos inválidos y aviso enfocado.
 * @param errors - Textos del idioma activo.
 */
export function useFormNotice(errors: FormErrorCopy) {
  const alertRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [messages, setMessages] = useState<string[]>([]);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  useEffect(() => {
    if (messages.length === 0) return;
    const node = alertRef.current;
    if (!node) return;
    node.focus({ preventScroll: true });
    node.scrollIntoView({ block: 'center' });
  }, [messages]);

  function showFailure(failure: FormFailure) {
    setStatus('error');
    setInvalidFields(failure.fields);
    setMessages(formErrorMessages(errors, failure));
  }

  function showFields(fields: readonly string[]) {
    showFailure({ status: 400, fields: [...fields] });
  }

  function beginSubmit() {
    setStatus('sending');
    setMessages([]);
    setInvalidFields([]);
  }

  function fieldError(name: string): string | undefined {
    if (!invalidFields.includes(name)) return undefined;
    return errors.fields[name];
  }

  return {
    status,
    setStatus,
    messages,
    alertRef,
    showFailure,
    showFields,
    beginSubmit,
    fieldError,
  };
}
