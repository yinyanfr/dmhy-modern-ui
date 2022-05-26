import { parseDMHYList } from './lib';
import type { RequestHandler } from 'umi';
import fs from 'fs/promises';
import path from 'path';
import options from './options.json';

export async function getDMHYList() {
  const reader = await fs.readFile(path.join(__dirname, 'list.html'));
  return reader.toString('utf-8');
}

const api: Record<string, RequestHandler> = {
  'GET /api/list': async (_, res) => {
    try {
      const html = await getDMHYList();
      const list = parseDMHYList(html);
      res.send({ data: list });
    } catch (error) {
      res.status(404).send(error);
    }
  },
  'GET /api/options': (_, res) => {
    res.send({ data: options });
  },
};

export default api;
