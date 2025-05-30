export interface GenerateScriptPayload {
  type: 'include' | 'exclude';
  domains: string[];
  advert: number;
}
