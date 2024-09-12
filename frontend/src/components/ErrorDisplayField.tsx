import React from "react";

interface ErrorDisplayFieldProps {
  errors: any;
  name: string;
  className?: string; // Add optional className prop
}

const ErrorDisplayField: React.FC<ErrorDisplayFieldProps> = ({ errors, name, className }) => {
  if (errors && errors[name]) {
    return (
      <span className={className} role="alert" id="danger">
        <i className="fas fa-times-circle" aria-hidden="true"></i>
        {errors[name].message}
      </span>
    );
  }
  return null;
};

export default ErrorDisplayField;
