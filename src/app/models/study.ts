import { Site } from './site';

export class Study {
  id: number;
  name: string;
  description?: string;
  status: number;
  sites?: Site[];
}
