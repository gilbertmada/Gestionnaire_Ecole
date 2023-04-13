import { ChangeEvent } from 'react';

export interface AbstractEmptyInterface {}
export interface FunctionProps {
  handleChangeField: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleChangeSelect: (e: any, value: any) => void;
  handleChangeDate: (name: string) => (val: any, rVal?: string | null) => void;
}

export type SnackBarSeverity = 'success' | 'warning' | 'info' | 'error';
