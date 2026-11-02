export const userSchema = {
type: "object", 
	properties:{
		id:{
			type:"number"
		}, 
		firstName:{ 
			type:"string" 
		}, 
		lastName:{
			type:"string" 
		}, 
		email:{ 
			type:"string" 
		}, 
		age:{
			type:"number" 
		}, 
		hair:{
			type:"object" 
		}, 
		address:{
			type:"object" 
		}, 
		bank:{
			type:"object" 
		}, 
		role:{
			type:"string" 
		},
	}, 
	required:[ "id","firstName","lastName","email","role" ],
    //không có phần tử thừa (dùng hi viết full schema)
    // additionalProperties:false
}