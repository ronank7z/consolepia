import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Login from "@components/Login";

const SignInPage = async () => {
	const session = await getServerSession();

	if (session) {
		redirect("/");
	}

	return <Login />;
};

export default SignInPage;
