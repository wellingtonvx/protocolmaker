import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

export default function Input({ name, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: "value", //valor do input
    });
  }, [fieldName, registerField]);

  return (
    <select ref={selectRef} {...rest}>
      <option value="Santos Dumont">Santos Dumont</option>
      <option value="Praia de Iracema">Praia de Iracema</option>
      <option value="Papicu">Papicu</option>
      <option value="Seis Bocas">Seis Bocas</option>
      <option value="Fatima">Fatima</option>
    </select>
  );
}
