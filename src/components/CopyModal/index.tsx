import { simplifyMagnet } from '@/lib';
import { Switch, Input, Modal } from 'antd';
import type { FC, Dispatch, SetStateAction } from 'react';
import { useState, useEffect } from 'react';

interface CopyModalProps {
  magnets?: string[];
  setMagnets?: Dispatch<SetStateAction<string[]>>;
}

const CopyModal: FC<CopyModalProps> = ({ magnets = [], setMagnets }) => {
  const [simplify, setSimplify] = useState(false);
  const [localMagnets, setLocalMagnets] = useState(magnets);

  useEffect(() => {
    if (simplify) {
      setLocalMagnets(magnets.map(simplifyMagnet));
    } else {
      setLocalMagnets(magnets);
    }
  }, [magnets, simplify]);

  return (
    <Modal
      title="手动复制"
      visible={magnets.length > 0}
      onOk={() => setMagnets?.([])}
      onCancel={() => setMagnets?.([])}
    >
      <div>部分浏览器有剪贴板字数限制，请手动复制：</div>
      <div>
        简化磁力链接：
        <Switch
          checked={simplify}
          onChange={(checked) => setSimplify(checked)}
        />
        {simplify ? <span> (将丢失tracker信息)</span> : null}
      </div>
      <div className="gap-12" />
      <Input.TextArea
        autoSize
        readOnly
        showCount
        value={localMagnets.join('\n')}
      />
    </Modal>
  );
};

export default CopyModal;
