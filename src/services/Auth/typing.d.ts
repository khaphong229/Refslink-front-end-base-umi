
export interface User {
	full_name : String, 
	email: String,
	password: String,
	
}
export interface ChangePasswordBody {
	password:string,
	new_password:string,
}

