export type UserRole = 'customer' | 'admin';

export type Address = {
  street: string;
  buildingNumber: string;
  apartmentNumber?: string;
  postalCode: string;
  city: string;
};

export type UserAccountBase = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
};

export type CustomerAccount = UserAccountBase & {
  role: 'customer';
  deliveryAddress: Address;
};

export type AdminAccount = UserAccountBase & {
  role: 'admin';
};

export type UserAccount = CustomerAccount | AdminAccount;

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

export type PublicUserAccount = DistributiveOmit<UserAccount, 'passwordHash'>;

export type RegisterUser = Omit<CustomerAccount, 'role' | 'id' | 'passwordHash'> & {
  password: string;
};
export type CreateAdmin = Omit<AdminAccount, 'role' | 'id' | 'passwordHash'> & {
  password: string;
};
export type UpdateCustomerInput = Pick<
  CustomerAccount,
  'name' | 'email' | 'phone' | 'deliveryAddress'
>;
export type UpdateAdminInput = Pick<AdminAccount, 'name' | 'email' | 'phone'>;

export type UpdateProfileInput = UpdateCustomerInput | UpdateAdminInput;

export type StoredSession = {
  userId: string;
  expiresAt: number;
};
