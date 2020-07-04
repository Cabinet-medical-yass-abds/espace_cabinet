export interface doctor {
  nom : String,
    prenom : String ,
    email: { type: String, unique: true, lowercase: true },
    password: String,
    adress: {
        street: String,
        city: String,
        zip: String
    },
    numtel :String,
    man: { type: Boolean ,default :true }, 
    spec: String,
    bio: String,
  id_secrt: String,
}