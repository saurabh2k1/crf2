import { Site } from './site';

export class Study {
  id?: number;
  _id?: string;
  name: string;
  description?: string;
  status?: number;
  sites?: Site[];
}
