export interface registerInitialValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface loginInitialValues {
  email: string,
  password: string
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
    accessToken: string;
    currentUser: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  };
}

// export
