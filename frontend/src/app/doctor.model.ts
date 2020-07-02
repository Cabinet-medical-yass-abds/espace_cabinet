export interface doctor {
  spec: String,
  adress: {
      street: String,
      city: String,
      zip: String
  },
  man: { type: Boolean, required: true },
  bio: String,
  phone: String,
  id_secrt: String,
  id_user: String
}