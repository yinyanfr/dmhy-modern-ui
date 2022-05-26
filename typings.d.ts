declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

interface EelItem {
  id?: string;
  title?: string;
  group?: string;
  groupId?: string;
  time?: string;
  category?: string;
  categoryId?: string;
  uploader?: string;
  uploaderId?: string;
  seeder?: number;
  leecher?: number;
  completed?: number;
  size?: number;
  magnet?: string;
  color?: string;
}

interface EelResponseBody {
  data: EelItem[];
}

interface ISort {
  type?: 'ascend' | 'descend';
  dataIndex?: string;
}
