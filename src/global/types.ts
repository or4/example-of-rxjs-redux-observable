

export interface Form {
  username: string,
  password: string,
}

export interface Session {
  token: string,
  name: string,
  photo: string
}

export interface GlobalState {
  form: Form,
  session: Session,
  textToSave: string
}
