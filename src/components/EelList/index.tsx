import ProList from '@ant-design/pro-list';
import { Button, Divider, message, Space, Tag } from 'antd';
import type { FC, ReactText } from 'react';
import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { convertFromByte, isMobile, sortData } from '@/lib';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CopyOutlined,
  DownloadOutlined,
  FileOutlined,
  ReloadOutlined,
  ShareAltOutlined,
  UserOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { getLocale, useModel } from 'umi';
import SorterButton from '../SorterButton';
import { DMHYListParams } from '@/services';
import CopyModal from '../CopyModal';

interface EelListProps {
  data?: EelItem[];
  loading?: boolean;
  refresh?: () => Promise<EelItem[]>;
  run?: (params?: DMHYListParams) => Promise<EelItem[]>;
}

const EelList: FC<EelListProps> = ({ data = [], loading, refresh, run }) => {
  const mobile = isMobile();
  const locale = getLocale();
  const { runSearch } = useModel('search');

  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const [sorter, setSorter] = useState<ISort>({
    type: 'descend',
    dataIndex: 'time',
  });
  const [magnets, setMagnets] = useState<string[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: ReactText[]) => setSelectedRowKeys(keys),
  };

  return (
    <>
      <ProList<EelItem>
        rowKey="id"
        headerTitle="最新资源"
        loading={loading}
        tableStyle={{ padding: 0, margin: 0 }}
        itemLayout={mobile ? 'vertical' : 'horizontal'}
        toolbar={{
          actions: [
            <Button
              key="selectAll"
              type="text"
              onClick={() => {
                setSelectedRowKeys(() => data.map((e) => e.id || ''));
              }}
            >
              全选
            </Button>,
            <Button
              key="selectInvert"
              type="text"
              onClick={() => {
                setSelectedRowKeys((selectedKeys) =>
                  data
                    .map((e) => e.id || '')
                    .filter((e) => selectedKeys.indexOf(e) < 0),
                );
              }}
            >
              反选
            </Button>,
            <SorterButton
              key="bySize"
              name="size"
              label="大小"
              sorter={sorter}
              setSorter={setSorter}
            />,
            <SorterButton
              key="byTime"
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
                  <a
                    onClick={() =>
                      runSearch(run, { category: entity.categoryId })
                    }
                  >
                    {entity.category}
                  </a>
                </Tag>
              ) : null,
          },
          title: {
            dataIndex: 'title',
            render: (dom, entity) => (
              <span>
                {entity.category && mobile && (
                  <Tag color={entity.color}>
                    <a
                      onClick={() =>
                        runSearch(run, { category: entity.categoryId })
                      }
                    >
                      {entity.category}
                    </a>
                  </Tag>
                )}
                {entity.group && (
                  <Tag>
                    <a
                      onClick={() => runSearch(run, { group: entity.groupId })}
                    >
                      {entity.group}
                    </a>
                  </Tag>
                )}
                <a href={entity.magnet}>{dom}</a>
              </span>
            ),
          },
          description: {
            render: (_, entity) => {
              const time = moment(entity.time).locale(locale);
              const { value, unit } = convertFromByte(entity.size || 0);

              if (mobile) return null;
              return (
                <Space split={<Divider type="vertical" />}>
                  <span>
                    <FileOutlined /> {value} {unit}
                  </span>
                  <span>
                    <ClockCircleOutlined /> {time.format('YYYY/MM/DD hh:mm')}
                  </span>
                  <span>
                    <span>
                      <ArrowUpOutlined /> {entity.seeder || '-'}
                    </span>
                    <span>
                      <ArrowDownOutlined /> {entity.leecher || '-'}
                    </span>
                    <span>
                      <CheckOutlined /> {entity.completed || '-'}
                    </span>
                  </span>
                  <a
                    onClick={() =>
                      runSearch(run, {
                        uploader: entity.uploaderId,
                        uploaderName: entity.uploader,
                      })
                    }
                  >
                    <UserOutlined /> {entity.uploader}
                  </a>
                </Space>
              );
            },
          },
          actions: {
            render: (_, entity) => {
              const time = moment(entity.time).locale(locale);
              const { value, unit } = convertFromByte(entity.size || 0);

              return (
                <Space split={<Divider type="vertical" />}>
                  {mobile ? (
                    <>
                      <span>
                        <FileOutlined /> {value} {unit}
                      </span>
                      <span>
                        <ClockCircleOutlined />{' '}
                        {mobile
                          ? time.calendar()
                          : time.format('YYYY/MM/DD hh:mm')}
                      </span>
                    </>
                  ) : null}

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
        tableAlertOptionRender={() => (
          <Space>
            <Button
              type="link"
              icon={<CopyOutlined />}
              onClick={() => {
                setMagnets(
                  data
                    ?.filter((e) => selectedRowKeys.includes(e.id || ''))
                    ?.map((e) => e.magnet || ''),
                );
              }}
            >
              复制链接
            </Button>
            <Button
              type="link"
              icon={<CloseCircleOutlined />}
              onClick={() => {
                setSelectedRowKeys([]);
              }}
            >
              取消选择
            </Button>
          </Space>
        )}
      />

      <CopyModal magnets={magnets} setMagnets={setMagnets} />
    </>
  );
};

export default EelList;
