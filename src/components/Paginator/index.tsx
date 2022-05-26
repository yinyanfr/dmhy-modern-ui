import { DMHYListParams } from '@/services';
import { Button, Card, InputNumber } from 'antd';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useModel } from 'umi';
import styles from './index.less';

interface PaginatorProps {
  loading?: boolean;
  run?: (params?: DMHYListParams) => Promise<EelItem[]>;
}

const Paginator: FC<PaginatorProps> = ({ loading, run }) => {
  const { page, runSearch } = useModel('search');
  const [localPage, setLocalPage] = useState(page);

  useEffect(() => {
    if (page !== localPage) {
      setLocalPage(page);
    }
  }, [page]);

  const rerun = async (newPage: number) => {
    runSearch(run, { page: newPage });
  };

  return (
    <Card className={styles.paginator}>
      <Button
        disabled={loading || localPage <= 1}
        onClick={async () => {
          if (run) {
            await rerun(localPage - 1);
            setLocalPage((prev) => prev - 1);
          }
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
          if (run) {
            await rerun(localPage);
          }
        }}
      />
      <Button
        disabled={loading}
        onClick={async () => {
          if (run) {
            await rerun(localPage + 1);
            setLocalPage((prev) => prev + 1);
          }
        }}
        type="link"
      >
        下一页
      </Button>
    </Card>
  );
};

export default Paginator;
