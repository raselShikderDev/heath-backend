export type createPatientInput = {
  passowrd: string;
  patient: {
    name: string;
    email: string;
    address?: string;
  };
};
