import { parseDMHY } from './lib';
import type { RequestHandler } from 'umi';
import fs from 'fs/promises';
import path from 'path';

export async function getHTML() {
  const reader = await fs.readFile(path.join(__dirname, 'mock.html'));
  return reader.toString('utf-8');
}

const api: Record<string, RequestHandler> = {
  'GET /api/list': async (_, res) => {
    try {
      const html = await getHTML();
      const list = parseDMHY(html);
      res.send({ data: list });
    } catch (error) {
      res.status(404).send(error);
    }
  },
};

export default api;
