export interface doctor {
  name: String ,
  fname :String,
  email: String,
  spec: String,
  adress : {
      street : String ,
      city : String ,
      zip : String
  } ,
  password : String,
  man : {type:Boolean, required : true },
  bio : String,
  id_secrt : String
}