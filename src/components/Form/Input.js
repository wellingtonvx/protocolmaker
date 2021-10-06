import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

import styles from "./styles.module.scss";

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value", //valor do input
    });
  }, [fieldName, registerField]);

  return (
    <div>
      <input ref={inputRef} {...rest} />
      {error && <span>{error}</span>}
    </div>
  );
}
