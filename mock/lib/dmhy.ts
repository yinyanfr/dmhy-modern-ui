import { JSDOM } from 'jsdom';
import { trim } from 'lodash';
import moment from 'moment';
import { Converter } from 'opencc-js';
import { convertToByte } from './utils';

const converter = Converter({ from: 'tw', to: 'cn' });

function timeConvert(raw?: string): string | undefined {
  if (raw) {
    const time = moment(raw, 'YYYY/MM/DD HH:mm');
    return time.toString();
  }
  return undefined;
}

function sizeConvert(raw?: string): number | undefined {
  if (raw) {
    const num = raw.match(/^[0-9]+(\.[0-9]+)?/)?.[0];
    if (!num) {
      return undefined;
    }
    const unit = raw.match(/[A-Z]+$/)?.[0] || 'B';
    return convertToByte(parseFloat(num), unit);
  }
  return undefined;
}

export function parseDMHYOptions(html: string) {}

export function parseDMHYList(html: string): EelItem[] {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const table: HTMLTableElement | null =
    document.querySelector('table#topic_list');

  const collection: EelItem[] = [];
  if (table?.tBodies) {
    for (const item of table.tBodies) {
      for (const row of item.rows) {
        const item: EelItem = {};
        const group = row.querySelector('td.title span.tag a');
        item.group = converter(trim(group?.innerHTML) || '');
        item.groupId = group?.getAttribute('href')?.match(/[0-9]+$/)?.[0];
        const title = row.querySelector(
          `td.title a:nth-child(${group ? 2 : 1})`,
        );
        item.title = converter(
          trim(title?.innerHTML?.replace(/\n */g, '')) || '',
        );
        item.id = title
          ?.getAttribute('href')
          ?.match(/[^\/]+\.html$/)?.[0]
          ?.replace('.html', '');
        const category = row.querySelector(`td a[class^="sort-"] font`);
        item.color = category?.getAttribute('color') || undefined;
        item.category = converter(category?.innerHTML || '');
        item.categoryId = category?.parentElement
          ?.getAttribute('href')
          ?.match(/[0-9]+$/)?.[0];
        const time = row.querySelector('td')?.querySelector('span');
        item.time = timeConvert(time?.innerHTML);
        const magnet = row.querySelector('td a.arrow-magnet');
        item.magnet = magnet?.getAttribute('href') || undefined;
        const size = row.querySelector('td:nth-child(5)');
        item.size = sizeConvert(size?.innerHTML);
        const seeder = row.querySelector('td:nth-child(6) .btl_1');
        const leecher = row.querySelector('td:nth-child(7) .bts_1');
        const completed = row.querySelector('td:nth-child(8)');
        const uploader = row.querySelector('td:nth-child(9) a');
        item.seeder = parseInt(seeder?.innerHTML || '0');
        item.leecher = parseInt(leecher?.innerHTML || '0');
        item.completed = parseInt(completed?.innerHTML || '0');
        item.uploader = uploader?.innerHTML;
        item.uploaderId = uploader?.getAttribute('href')?.match(/[0-9]+$/)?.[0];

        collection.push(item);
      }
    }
  }

  return collection;
}
