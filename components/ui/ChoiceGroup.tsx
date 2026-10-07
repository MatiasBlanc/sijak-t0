interface ChoiceOption {
  value: string;
  label: string;
}

interface ChoiceGroupProps {
  legend: string;
  name: string;
  value: string;
  options: readonly ChoiceOption[];
  error?: string;
  onChange: (value: string) => void;
}

/** Grupo de opciones tipo píldora, con error visible bajo la leyenda. */
export function ChoiceGroup({ legend, name, value, options, error, onChange }: ChoiceGroupProps) {
  return (
    <fieldset className={error ? 'field-invalid' : undefined}>
      <legend>{legend}</legend>
      <div className="role-options">
        {options.map((option) => (
          <label
            key={option.value}
            className={value === option.value ? 'role-pill selected' : 'role-pill'}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${name}-error` : undefined}
              onChange={() => onChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
      {error ? (
        <span id={`${name}-error`} className="field-error">
          {error}
        </span>
      ) : null}
    </fieldset>
  );
}
