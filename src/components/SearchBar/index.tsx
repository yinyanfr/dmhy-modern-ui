import { SearchOutlined } from '@ant-design/icons';
import { Card, Input, Select } from 'antd';
import type { FC } from 'react';
import { useRequest } from 'umi';

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

const SearchBar: FC = () => {
  const { loading, data } = useRequest<{ data: OptionsData }>('/api/options');
  return (
    <Card>
      <Input.Search
        size="large"
        prefix={<SearchOutlined />}
        placeholder="搜索关键词"
        enterButton
      />

      <div className="horizontal-flex">
        <div>
          分类：
          <Select
            style={{ width: 120 }}
            showSearch
            loading={loading}
            options={data?.categories}
            defaultActiveFirstOption
            defaultValue="0"
            optionFilterProp="label"
            filterOption={(input, option) =>
              (option!.label as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </div>
        <div>
          联盟：
          <Select
            style={{ width: 120 }}
            showSearch
            loading={loading}
            options={data?.groups}
            defaultActiveFirstOption
            defaultValue="0"
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
            defaultValue="date-desc"
            optionFilterProp="label"
            filterOption={(input, option) =>
              (option!.label as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </div>
      </div>
    </Card>
  );
};

export default SearchBar;
