import { Button, Card, InputNumber } from 'antd';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useModel } from 'umi';
import styles from './index.less';

const Paginator: FC = () => {
  const { page, runSearch, loading, run } = useModel('search');
  const [localPage, setLocalPage] = useState(page);

  useEffect(() => {
    setLocalPage(page);
  }, [page]);

  const rerun = async (newPage: number) => {
    runSearch(run, { page: newPage });
  };

  return (
    <Card className={styles.paginator}>
      <Button
        disabled={loading || localPage <= 1}
        onClick={async () => {
          await rerun(localPage - 1);
          setLocalPage((prev) => prev - 1);
        }}
        type="link"
      >
        上一页
      </Button>
      <InputNumber
        style={{ width: 50 }}
        min={1}
        precision={0}
        value={localPage}
        controls={false}
        onChange={(value) => {
          setLocalPage(value);
        }}
        onPressEnter={async () => {
          await rerun(localPage);
        }}
      />
      <Button
        disabled={loading}
        onClick={async () => {
          await rerun(localPage + 1);
          setLocalPage((prev) => prev + 1);
        }}
        type="link"
      >
        下一页
      </Button>
    </Card>
  );
};

export default Paginator;
