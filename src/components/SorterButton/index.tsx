import { CaretDownFilled, CaretUpOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';

interface SorterButtonProps {
  name: string;
  label?: string;
  sorter?: ISort;
  setSorter?: Dispatch<SetStateAction<ISort>>;
}

const SorterButton: FC<SorterButtonProps> = ({ name, label, sorter, setSorter }) => {
  let icon: ReactNode = undefined;
  if (name === sorter?.dataIndex) {
    if (sorter?.type === 'ascend') {
      icon = <CaretUpOutlined />;
    }
    if (sorter?.type === 'descend') {
      icon = <CaretDownFilled />;
    }
  }

  return (
    <Button
      type="text"
      icon={icon}
      onClick={() => {
        setSorter?.((prev) => ({
          dataIndex: name,
          type: prev.type === 'descend' ? 'ascend' : 'descend',
        }));
      }}
    >
      {label}
    </Button>
  );
};

export default SorterButton;
