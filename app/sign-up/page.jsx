import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Register from "@components/Register";

const RegisterPage = async () => {
	const session = await getServerSession();

	if (session) {
		redirect("/");
	}

	return <Register />;
};

export default RegisterPage;
