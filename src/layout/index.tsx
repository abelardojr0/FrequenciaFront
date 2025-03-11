import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  ContainerSection,
  DropdownItem,
  DropdownMenu,
  HeaderList,
  HeaderListItemText,
  HeaderLogoStyled,
  HeaderStyled,
  ProfileContainer,
  ProfileIcon,
  UserNameDisplay,
} from './style';
import HomeIcon from '@mui/icons-material/Home';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import ClassIcon from '@mui/icons-material/Class';
import { cloneElement, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import logo_completa from '../assets/logo_completa.png';

export const Layout = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const itens = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Frequência', path: '/frequencias', icon: <HistoryEduIcon /> },
    { text: 'Turmas', path: '/turmas', icon: <ClassIcon /> },
  ];

  const [open, setOpen] = useState<boolean>(true);
  const [checkSize, setCheckSize] = useState<boolean>();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1300) {
        setOpen(false);
        setCheckSize(false);
      } else {
        setOpen(true);
        setCheckSize(true);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Controla o estado do dropdown
  const [user, setUser] = useState<any>(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.user) {
      const userName = auth.user?.nome || '';
      setUser({
        name: userName,
      });

      const nameParts = userName.split(' ');
      const initials =
        nameParts[0].charAt(0) + (nameParts[1] ? nameParts[1].charAt(0) : '');
      setUser({
        name: userName,
        initials: initials.toUpperCase(),
      });
    }
  }, [auth.user]);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  const dropdownRef: any = useRef(null);
  const profileIconRef: any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileIconRef.current &&
        !profileIconRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <HeaderStyled className={open ? '' : 'desativo'}>
        <HeaderLogoStyled className={open ? '' : 'desativo'} to={'/'}>
          <img src={logo_completa} alt="Logo" />
        </HeaderLogoStyled>

        <nav>
          <HeaderList>
            {itens &&
              itens.map((item: any) => (
                <li key={item.path}>
                  <HeaderListItemText
                    className={currentPath === item.path ? 'ativo' : ''}
                    to={item.path}
                  >
                    {item.icon &&
                      cloneElement(item.icon, {
                        className: currentPath === item.path ? 'ativo' : '',
                      })}

                    {open && checkSize && item.text}
                  </HeaderListItemText>
                </li>
              ))}
            <ProfileContainer>
              <ProfileIcon ref={profileIconRef} onClick={toggleDropdown}>
                {user?.initials}
              </ProfileIcon>
              {isDropdownOpen && (
                <DropdownMenu ref={dropdownRef}>
                  <UserNameDisplay>{user?.name}</UserNameDisplay>
                  <DropdownItem
                    onClick={() => navigate(`/config/${auth?.user?.id}`)}
                  >
                    Configurações
                  </DropdownItem>
                  <DropdownItem onClick={handleLogout}>Sair</DropdownItem>
                </DropdownMenu>
              )}
            </ProfileContainer>
          </HeaderList>
        </nav>
      </HeaderStyled>

      <ContainerSection>
        <Outlet />
      </ContainerSection>
    </Container>
  );
};
