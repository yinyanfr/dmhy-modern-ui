import { isBrowser } from 'umi';
import moment from 'moment';
import type { Moment } from 'moment';

const factors: Record<string, number> = {
  B: 1,
  KB: 1024,
  MB: Math.pow(1024, 2),
  GB: Math.pow(1024, 3),
  TB: Math.pow(1024, 4),
};

export function convertFromByte(byte: number) {
  const index = Math.log(byte) / Math.log(1024);

  return {
    value: byte / Math.pow(1024, Math.floor(index)),
    unit: Object.keys(factors)[Math.floor(index)],
  };
}

export function isMobile(): boolean {
  if (isBrowser()) {
    return (
      window.innerWidth < 480 && window.innerWidth / window.innerHeight < 0.75
    );
  }
  return false;
}

export function sortByMoment(a: Moment, b: Moment): number {
  if (a.isSame(b)) {
    return 0;
  }
  if (a.isBefore(b)) {
    return 1;
  }
  return -1;
}

export function sortData(data: EelItem[] = [], sorter: ISort = {}): EelItem[] {
  const { type, dataIndex } = sorter;
  if (!dataIndex) return data;
  const copy = [...data];
  if (dataIndex === 'size') {
    copy.sort(
      (a, b) =>
        (type === 'descend' ? -1 : 1) * ((a?.size || 0) - (b?.size || 0)),
    );
  }
  if (dataIndex === 'time') {
    copy.sort(
      (a, b) =>
        (type === 'descend' ? 1 : -1) *
        sortByMoment(moment(a.time), moment(b.time)),
    );
  }
  return copy;
}
