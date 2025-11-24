// Base Type
export type Register = {
  name: string
  email: string
  phone: string
  password: string
}

export type User = {
  id: number
  name: string
  email: string
  phone: string
  createdAt: string
}

export type Login = {
  email: string
  password: string
}


// Register Response
export type RegisterResponse = {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
};

// Login Response 
export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
};


