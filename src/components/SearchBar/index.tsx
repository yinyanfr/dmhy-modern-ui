import { DMHYListParams } from '@/services';
import {
  CloseCircleOutlined,
  RedoOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Card, Input, Select } from 'antd';
import type { FC } from 'react';
import { useModel, useRequest } from 'umi';

interface Option {
  value: string;
  label: string;
  color?: string;
}
interface OptionsData {
  categories: Option[];
  groups: Option[];
  orders: Option[];
}

interface SearchBarProps {
  run?: (params?: DMHYListParams) => Promise<EelItem[]>;
}

const SearchBar: FC<SearchBarProps> = ({ run }) => {
  const { loading, data } = useRequest<{ data: OptionsData }>('/api/options');
  const {
    setKeyWord,
    category,
    setCategory,
    group,
    setGroup,
    order,
    setOrder,
    uploader,
    setUploader,
    init,
    runSearch,
    uploaderName,
    setUploaderName,
  } = useModel('search');

  return (
    <Card>
      <Input.Search
        size="large"
        prefix={<SearchOutlined />}
        placeholder="搜索关键词"
        enterButton
        onSearch={async (value) => {
          setKeyWord(value);
          await runSearch(run);
        }}
      />

      <div className="horizontal-flex">
        <div>
          分类：
          <Select
            style={{ width: 120 }}
            showSearch
            loading={loading}
            // options={data?.categories}
            defaultActiveFirstOption
            value={category}
            defaultValue="0"
            onSelect={(value: string) => {
              setCategory(value);
            }}
            optionFilterProp="label"
            filterOption={(input, option) =>
              (option!.label as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {data?.categories?.map((e) => (
              <Select.Option key={e.value} value={e.value}>
                <span style={{ color: e.color }}>{e.label}</span>
              </Select.Option>
            ))}
          </Select>
        </div>
        <div>
          联盟：
          <Select
            style={{ width: 120 }}
            showSearch
            loading={loading}
            options={data?.groups}
            defaultActiveFirstOption
            value={group}
            defaultValue="0"
            onSelect={(value: string) => {
              setGroup(value);
            }}
            optionFilterProp="label"
            filterOption={(input, option) =>
              (option!.label as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </div>
        <div>
          顺序：
          <Select
            style={{ width: 180 }}
            showSearch
            loading={loading}
            options={data?.orders}
            defaultActiveFirstOption
            value={order}
            defaultValue="date-desc"
            onSelect={(value: string) => {
              setOrder(value);
            }}
            optionFilterProp="label"
            filterOption={(input, option) =>
              (option!.label as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </div>
        {uploader ? (
          <div>
            <Input
              size="small"
              readOnly
              value={uploaderName}
              prefix="发布者："
              suffix={
                <Button
                  type="text"
                  icon={<CloseCircleOutlined />}
                  onClick={() => {
                    setUploader(undefined);
                    setUploaderName(undefined);
                  }}
                />
              }
            />
          </div>
        ) : null}
        <div>
          <Button type="link" icon={<RedoOutlined />} onClick={init}>
            全部重置
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SearchBar;
