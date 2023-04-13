export interface FooterMenuOption {
  label: string;
  onClick: (e: MouseEvent) => void;
}

export interface FooterIcon {
  id: number;
  ItemIcon: any;
  onClick?: (e: MouseEvent) => void;
  type?: string;
  label?: string;
  color?: string;
  fontSize?: string;
  options?: FooterMenuOption[];
  title?: string;
  disabled?: boolean;
}

export type UsersRoleType = 'ADMIN' | 'DIR' | 'PROF' | 'SURV' | 'ELEV' | 'PA';
