import { ButtonAtomStyled } from './style';

interface ButtonAtomProps {
  children: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
}
export const ButtonAtom = ({ children, ...props }: ButtonAtomProps) => {
  return <ButtonAtomStyled {...props}>{children}</ButtonAtomStyled>;
};
