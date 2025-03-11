import { Link } from 'react-router-dom';
import { SubtitlePage } from '../../../utils/globalStyles';
import { Linhazinha, StyledSubtitleAdd, SubtitleIcons } from './style';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';

interface SubtitleAddProps {
  text: string;
  to: string;
  setSearch: (e: any) => void;
}

export const SubtitleAdd = ({ text, to, setSearch }: SubtitleAddProps) => {
  const [active, setActive] = useState(false);
  const toggleSearch = () => {
    setActive((prev) => !prev); // Alterna o valor de `active`
  };
  useEffect(() => {
    setSearch(active);
  }, [active]);

  return (
    <>
      <StyledSubtitleAdd>
        <SubtitlePage>{text}</SubtitlePage>
        <SubtitleIcons>
          <Link to={to}>
            <AddCircleOutlineIcon />
          </Link>
          <div onClick={toggleSearch}>
            <SearchIcon />
          </div>
        </SubtitleIcons>
      </StyledSubtitleAdd>
      {!active && <Linhazinha />}
    </>
  );
};
