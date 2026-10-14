export interface Mandate {
  id: string;
  code: string;
  label: string;
  title: string;
  description: string;
}

export interface VerifiedEndpoint {
  id: string;
  type: 'email' | 'signal' | 'matrix';
  label: string;
  value: string;
  indicatorColor?: string;
  hasCopy?: boolean;
}

export interface DispatchFormData {
  sender: string;
  email: string;
  payload: string;
  signWithPgp: boolean;
}

export type BayIndex = 0 | 1 | 2;
