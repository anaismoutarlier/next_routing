"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Select = ({ value = [], title, name, onChange, values }) => {
  return (
    <div>
      <p>{title || name}</p>
      {values.map(el => (
        <button
          type="button"
          className="select_button"
          key={el}
          style={{ opacity: value.includes(el) ? 1 : 0.3 }}
          onClick={() =>
            onChange({ target: { value: [...new Set([...value, el])], name } })
          }
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export function AddPostForm({ fields }) {
  const router = useRouter();
  const [formData, setFormData] = useState({});

  const handleSubmit = async e => {
    console.log(formData);
    e.preventDefault();
    const data = await fetch(`${process.env.NEXT_PUBLIC_URI_BACKEND}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token ABCD1234EDFG",
      },
      body: JSON.stringify(formData),
    });
    const { result } = await data.json();
    console.log(result);
    if (result) router.refresh();
  };

  const handleChange = e => {
    console.log(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      {fields.map(field =>
        field.type === "select" ? (
          <Select
            key={field.name}
            {...field}
            value={formData[field.name]}
            onChange={handleChange}
          />
        ) : (
          <input
            key={field.name}
            {...field}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.name}
          />
        )
      )}
      <button type="submit">Submit</button>
    </form>
  );
}
