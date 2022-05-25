import { SearchOutlined } from '@ant-design/icons';
import { Card, Divider, Input, Select, Space } from 'antd';
import type { FC } from 'react';

const mockOptions = [{ value: 'all', label: '全部' }];
const mockOptions1 = [{ value: 'all', label: '时间倒序' }];

const SearchBar: FC = () => {
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
            options={mockOptions}
            defaultActiveFirstOption
            defaultValue="all"
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
            options={mockOptions}
            defaultActiveFirstOption
            defaultValue="all"
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
            style={{ width: 120 }}
            showSearch
            options={mockOptions1}
            defaultActiveFirstOption
            defaultValue="all"
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
