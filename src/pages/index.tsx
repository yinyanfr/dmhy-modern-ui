import { EelList, Paginator, SearchBar } from '@/components';
import { isMobile } from '@/lib';
import { PageContainer } from '@ant-design/pro-layout';
import { BackTop } from 'antd';
import type { FC } from 'react';
import { Helmet } from 'umi';

const App: FC = () => {
  const listview = (
    <>
      <SearchBar />
      <div className="gap-12" />
      <EelList />
      <Paginator />
    </>
  );

  return (
    <>
      <Helmet>
        <title>冻鳗花园</title>
        <meta name="description" content="Yet another dmhy frontend implementation" />
      </Helmet>
      <BackTop />
      {isMobile() ? (
        listview
      ) : (
        <PageContainer title={false} ghost>
          {listview}
        </PageContainer>
      )}
    </>
  );
};

export default App;
