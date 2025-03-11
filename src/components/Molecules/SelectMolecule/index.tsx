import {
  SelectMoleculeStyled,
  SelectAtomStyled,
  LabelAtomStyled,
  ErrorText,
} from './style';

interface SelectMoleculeProps {
  htmlFor: string;
  children: string;
  id: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number | undefined; text: string }[] | null;
  error?: boolean;
  errorMessage?: string;
  onSelectClearError?: () => void;
}

export const SelectMolecule = ({
  children,
  options,
  error,
  errorMessage,
  onSelectClearError,
  ...props
}: SelectMoleculeProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onSelectClearError) onSelectClearError();
    if (props.onChange) props.onChange(e);
  };

  return (
    <SelectMoleculeStyled>
      <LabelAtomStyled htmlFor={props.htmlFor}>{children}</LabelAtomStyled>
      <SelectAtomStyled {...props} error={error} onChange={handleChange}>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </SelectAtomStyled>
      {error && errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </SelectMoleculeStyled>
  );
};
