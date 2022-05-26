import { EelList, Paginator, SearchBar } from '@/components';
import { isMobile } from '@/lib';
import { getDMHYList } from '@/services';
import { PageContainer } from '@ant-design/pro-layout';
import { BackTop } from 'antd';
import type { FC } from 'react';
import { Helmet, useRequest } from 'umi';

const App: FC = () => {
  const { loading, data, refresh, run } = useRequest(getDMHYList);

  const listview = (
    <>
      <SearchBar run={run} />
      <div className="gap-12" />
      <EelList data={data} loading={loading} refresh={refresh} run={run} />
      <Paginator loading={loading} run={run} />
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
