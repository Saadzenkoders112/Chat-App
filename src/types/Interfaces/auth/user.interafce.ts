export interface initialValues {
  firstName: string;
  lastName: string;
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

// export
