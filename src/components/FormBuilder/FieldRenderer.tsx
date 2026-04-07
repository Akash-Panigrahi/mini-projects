function FieldRenderer({ field, value, onChange }) {
  if (field.type === "text") {
    return (
      <input
        id={field.name}
        name={field.name}
        value={value}
        onChange={(e) => onChange(field.name, e.target.value)}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        id={field.name}
        name={field.name}
        value={value}
        onChange={(e) => onChange(field.name, e.target.value)}
      >
        {field.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  return null;
}

export default FieldRenderer;
