export type JwtPayloadType = {
  email: string;
  identify_number: string;
  phone: string;
  prefix: string;
  other_prefix: string;
  fname_th: string;
  lname_th: string;
  fname_en: string;
  lname_en: string;
  is_active: 0 | 1 | 2;
};

export interface JwtPayload {
  email: string;
  identify_number: string;
  phone: string;
  prefix: string;
  other_prefix: string;
  fname_th: string;
  lname_th: string;
  fname_en: string;
  lname_en: string;
  is_active: 0 | 1 | 2;
}
