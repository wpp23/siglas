import React from 'react';
import { Controller } from 'react-hook-form';
import RSelect from 'react-select';
import htmlParse from 'html-react-parser';

interface SelectGridProps {
  control: any; 
  name: string;
  options: { value: any; label: string }[];
  label: string;
  placeholder?: string;
  rules?: { required: string };
}

const SelectGrid: React.FC<SelectGridProps> = ({ control, name, options, label, placeholder, rules }) => {
  
    // Adiciona um valor nulo no início do array de opções
  const optionsWithNull = [
    { value: null, label: htmlParse("<i className='fas fa-search' aria-hidden='true'></i>   Selecione...") }, 
    ...options
  ];

  return (
      <div className="br-select-search">
        <label htmlFor={name}>{label}</label> 
        <Controller
          name={name}
          control={control}
          rules={ rules || { required: false }} 
          render={({ field }) => (
            <>
              <RSelect
                {...field}
                id={name}
                options={optionsWithNull} 
                value={field.value !== undefined ? optionsWithNull.find(option => option.value === field.value) : null}
                onChange={(option) => field.onChange(option ? option.value : null)}
                onBlur={() => field.onBlur()}
                placeholder={placeholder ||
                      htmlParse(
                        "<i className='fas fa-search' aria-hidden='true'></i>   Selecione..."
                      )}
              />
            </>
          )}
        />
      </div>
  );
};

export default SelectGrid;
