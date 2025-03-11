import {
  BoxInputMoleculeStyled,
  InputAtomStyled,
  LabelAtomStyled,
  ErrorText,
} from './style';

interface BoxInputMoleculeProps {
  htmlFor: string;
  children: string;
  type: string;
  id: string;
  placeholder?: string;
  value?: any;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  onChange?: (e: any) => void;
  onInputClearError?: () => void;
}
export const BoxInputMolecule = ({
  children,
  error,
  errorMessage,
  onInputClearError,
  ...props
}: BoxInputMoleculeProps) => {
  const handleChange = (e: any) => {
    if (onInputClearError) onInputClearError();
    if (props.onChange) props.onChange(e);
  };

  return (
    <BoxInputMoleculeStyled>
      <LabelAtomStyled htmlFor={props.htmlFor}>{children}</LabelAtomStyled>
      <InputAtomStyled {...props} error={error} onChange={handleChange} />
      {error && errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </BoxInputMoleculeStyled>
  );
};
