import * as Yup from "yup";

export const registerSchema = Yup.object({
	name: Yup.string()
		.required("Please enter your name")
		.min(3, "Name must be at least 3 characters")
		.max(15, "Name must be less than 15 characters"),
	password: Yup.string()
		.required("Please enter your password")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
			"Password must contain atleast 5 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character."
		),
});

export const loginSchema = Yup.object({
	name: Yup.string()
		.required("Please enter your name")
		.min(3, "Name must be at least 3 characters")
		.max(15, "Name must be less than 15 characters"),
	password: Yup.string()
		.required("Please enter your password")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
			"Password must contain atleast 5 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character."
		),
});
