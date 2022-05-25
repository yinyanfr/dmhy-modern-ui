import { EelList, SearchBar } from '@/components';
import { isMobile } from '@/lib';
import { PageContainer } from '@ant-design/pro-layout';
import { Divider } from 'antd';
import type { FC } from 'react';
import { Helmet, useRequest } from 'umi';

const App: FC = () => {
  const { loading, data, refresh } = useRequest<{ data: EelItem[] }>(
    '/api/list',
  );

  const listview = (
    <>
      <SearchBar />
      <div className="gap-12" />
      <EelList data={data} loading={loading} refresh={refresh} />
    </>
  );

  return (
    <>
      <Helmet>
        <title>冻鳗花园</title>
        <meta
          name="description"
          content="Yet another dmhy frontend implementation"
        />
      </Helmet>
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
