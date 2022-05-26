import { Spin } from 'antd';
import { dynamic } from 'umi';

const renderLoading = () => <Spin spinning />;

export default dynamic({
  loader: async () => {
    // 动态加载第三方组件
    const { DarkModeToggle } = await import(
      /* webpackChunkName: "react-dark-mode-toggle-2" */ 'react-dark-mode-toggle-2'
    );
    return DarkModeToggle;
  },
  loading: () => renderLoading(),
});
