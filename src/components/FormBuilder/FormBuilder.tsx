import { useState, type FormEvent } from "react";
import type { Field } from "./types";
import FieldRenderer from "./FieldRenderer";
import "./style.css";

const schema: Field[] = [
  {
    type: "text",
    name: "username",
    label: "Username",
  },
  {
    type: "text",
    name: "email",
    label: "Email",
    validate: (value: string) => {
      value = value.trim();

      if (value === "") return "Email is required";
      if (value.includes("@") === false) return "Invalid email";

      return "";
    },
  },
  {
    type: "select",
    name: "role",
    label: "Role",
    options: [
      { label: "Admin", value: "admin" },
      { label: "User", value: "user" },
    ],
  },
  {
    type: "text",
    name: "company",
    label: "Company",
    showIf: (values) => values.role === "admin",
  },
];

function FormBuilder() {
  const [values, setValues] = useState<Record<string, unknown>>(() => {
    const initial = {} as Record<string, unknown>;

    schema.forEach((field) => {
      initial[field.name] = field.defaultValue ?? "";
    });

    return initial;
  });

  const [errors, setErrors] = useState({});

  const validate = (name: string, value: unknown) => {
    const field = schema.find((field) => field.name === name);

    if (field?.validate) {
      setErrors((prev) => ({
        ...prev,
        [name]: field.validate(value),
      }));
    }
  };

  const handleChange = (name: string, value: unknown) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    validate(name, value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(Object.fromEntries(new FormData(e.target).entries()));
  };

  return (
    <div className="form-builder">
      <form onSubmit={handleSubmit}>
        {schema.map((field) => {
          if (field.showIf && !field.showIf(values)) {
            return null;
          }

          return (
            <div className="field" key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <div>
                <FieldRenderer
                  field={field}
                  value={values[field.name]}
                  onChange={handleChange}
                />
                <div className="error">
                  {errors[field.name] && <span>{errors[field.name]}</span>}
                </div>
              </div>
            </div>
          );
        })}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormBuilder;
