import { FunctionComponent } from "react";

export const PasswordStrength: FunctionComponent<{ strength?: [number, number] }> = ({ strength }) => {
  if (!strength) {
    return null;
  }

  const [current, max] = strength;

  return <span>Password strength is {current} / {max}.</span>
}
