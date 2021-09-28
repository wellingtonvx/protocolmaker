import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

export default function Select({ name, children, ...rest }) {
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
      {children}
    </select>
  );
}
