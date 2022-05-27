import { DefaultFooter } from '@ant-design/pro-layout';
import type { FC } from 'react';
import CookieConsent from 'react-cookie-consent';

const StupidTypeScript: FC<any> = CookieConsent as unknown as FC<any>;
// remove this and see magic

const Footer: FC = () => {
  return (
    <div>
      <DefaultFooter
        copyright="本网站仅使用动漫花园数据，与动漫花园没有任何关联。本站数据获取设有十分钟缓存。"
        links={[
          {
            key: 'dmhy',
            title: '动漫花园',
            href: 'https://share.dmhy.org/',
            blankTarget: true,
          },
          {
            key: 'github',
            title: 'Fork me on GitHub',
            href: 'https://github.com/yinyanfr/eeling',
            blankTarget: true,
          },
        ]}
      />

      <StupidTypeScript
        style={{ background: 'white', color: 'black' }}
        buttonClasses="ant-btn ant-btn-primary"
        buttonStyle={{
          margin: 15,
        }}
        disableButtonStyles
        buttonText="好的"
      >
        本网站仅使用动漫花园数据，与动漫花园没有任何关联。本站数据获取设有十分钟缓存。
      </StupidTypeScript>
    </div>
  );
};

export default Footer;
