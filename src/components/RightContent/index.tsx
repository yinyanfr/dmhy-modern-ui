import { Space, Spin } from 'antd';
import type { FC } from 'react';
import DarkModeToggle from './DarkToggle';
import useDarkreader from './useDarkreader';
import styles from './index.less';
import { isBrowser } from 'umi';

const RightContent: FC = () => {
  const [isDark, { toggle }] = useDarkreader(
    localStorage.getItem('theme') === 'realDark' ||
      (window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches),
  );

  return (
    <Space className={isDark ? `${styles.right} ${styles.dark}` : styles.right}>
      <div className={styles.flexCenter}>
        {isBrowser() ? (
          <DarkModeToggle
            className={styles.natural}
            isDarkMode={isDark}
            onChange={(dark: boolean) => {
              localStorage.setItem('theme', dark ? 'realDark' : 'light');
              toggle();
            }}
            size={40}
          />
        ) : (
          <Spin spinning />
        )}
      </div>
    </Space>
  );
};

export default RightContent;
