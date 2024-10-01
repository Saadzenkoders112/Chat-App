export interface registerInitialValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface loginInitialValues {
  email: string;
  password: string;
}

export interface RegisterResponse {
  data: {
    accessToken: string;
    newUser: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  };
}

export interface LoginResponse {
  data: {
    message: string
    token: string;
    user: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      password: string,
      resetToken?: string,
      resetTokenExpiration?: string
    };
  };
}

export interface resetPassValues {
  email: string
  newPassword: string;
  resetToken: string;
}
