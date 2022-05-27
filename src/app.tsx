import type { ReactNode } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { RequestConfig } from 'umi';
import { Footer, MenuHeader, RightContent } from './components';
import { isMobile } from './lib';

export const layout = {
  rightContentRender: () => <RightContent />,
  footerRender: () => <Footer />,
  disableContentMargin: isMobile(),
  menuHeaderRender: (logo: ReactNode, title: ReactNode) => <MenuHeader logo={logo} title={title} />,
};

const proxyInterceptor = (url: string, options: any) => {
  if (url.match(/^\/api/)) {
    const realUrl = url.replace(/^\/api\/(.+)/, 'api/$1');
    // const realUrl = url;
    const server = '/';

    return {
      url: `${server}${realUrl}`,
      options: { ...options, interceptors: true },
    };
  }

  return { url, options };
};

export const request: RequestConfig = {
  requestInterceptors: [proxyInterceptor],
};
