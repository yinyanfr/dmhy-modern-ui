import ProList from '@ant-design/pro-list';
import { Button, Divider, message, Space, Tag } from 'antd';
import type { FC, ReactText } from 'react';
import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { convertFromByte, isMobile, sortData } from '@/lib';
import {
  ClockCircleOutlined,
  CopyOutlined,
  DownloadOutlined,
  FileOutlined,
  ReloadOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { getLocale } from 'umi';
import SorterButton from '../SorterButton';

interface EelListProps {
  data?: EelItem[];
  loading?: boolean;
  refresh?: () => Promise<EelItem[]>;
}

const EelList: FC<EelListProps> = ({ data, loading, refresh }) => {
  const mobile = isMobile();
  const locale = getLocale();
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const [sorter, setSorter] = useState<ISort>({
    type: 'descend',
    dataIndex: 'time',
  });
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: ReactText[]) => setSelectedRowKeys(keys),
  };
  return (
    <ProList<EelItem>
      rowKey="id"
      headerTitle="最新资源"
      loading={loading}
      tableStyle={{ padding: 0, margin: 0 }}
      itemLayout={mobile ? 'vertical' : 'horizontal'}
      toolbar={{
        actions: [
          <SorterButton
            name="size"
            label="大小"
            sorter={sorter}
            setSorter={setSorter}
          />,
          <SorterButton
            name="time"
            label="时间"
            sorter={sorter}
            setSorter={setSorter}
          />,
          <Button
            key="reload"
            type="text"
            icon={<ReloadOutlined />}
            onClick={refresh}
          >
            {mobile ? null : '刷新'}
          </Button>,
        ],
      }}
      metas={{
        avatar: {
          dataIndex: 'category',
          render: (_, entity) =>
            entity.category && !mobile ? (
              <Tag color={entity.color}>
                <a>{entity.category}</a>
              </Tag>
            ) : null,
        },
        title: {
          dataIndex: 'title',
          render: (dom, entity) => (
            <span>
              {entity.category && mobile && (
                <Tag color={entity.color}>
                  <a>{entity.category}</a>
                </Tag>
              )}
              {entity.group && (
                <Tag>
                  <a>{entity.group}</a>
                </Tag>
              )}
              <a href={entity.magnet}>{dom}</a>
            </span>
          ),
        },
        actions: {
          render: (_, entity) => {
            const time = moment(entity.time).locale(locale);
            const { value, unit } = convertFromByte(entity.size || 0);
            return (
              <Space split={<Divider type="vertical" />}>
                <span>
                  <FileOutlined /> {value} {unit}
                </span>
                {/* <span><FileOutlined /> {entity.size}</span> */}
                <span>
                  <ClockCircleOutlined />{' '}
                  {mobile ? time.calendar() : time.format('lll')}
                </span>

                <Space>
                  {mobile ? null : (
                    <Button
                      type="link"
                      icon={<DownloadOutlined />}
                      href={entity.magnet}
                    />
                  )}
                  <Button
                    type="link"
                    icon={<ShareAltOutlined />}
                    onClick={() => {
                      if (entity.magnet) {
                        copy(entity.magnet);
                        message.success('复制成功');
                      } else {
                        message.warning('链接不存在');
                      }
                    }}
                  >
                    {mobile && '复制链接'}
                  </Button>
                </Space>
              </Space>
            );
          },
        },
      }}
      rowSelection={rowSelection}
      showActions="always"
      dataSource={sortData(data, sorter)}
    />
  );
};

export default EelList;
