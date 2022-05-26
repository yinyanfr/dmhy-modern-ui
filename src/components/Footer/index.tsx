import { DefaultFooter } from '@ant-design/pro-layout';
import type { FC } from 'react';

const Footer: FC = () => {
  return (
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
  );
};

export default Footer;
