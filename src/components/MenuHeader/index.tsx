import type { FC, ReactNode } from 'react';
import { useModel } from 'umi';

interface MenuHeaderProps {
  logo?: ReactNode;
  title?: ReactNode;
}

const MenuHeader: FC<MenuHeaderProps> = ({ logo, title }) => {
  const { run, init } = useModel('search');

  return (
    <a
      onClick={() => {
        init();
        run({});
      }}
    >
      {logo}
      {title}
    </a>
  );
};

export default MenuHeader;
