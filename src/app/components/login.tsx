import { useUserContext, googleSignIn, logOut } from "@/context/userContext";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from "next/dist/client/components/navigation";
import { useEffect, useState } from "react";

const Login = () => {
    const user = useUserContext();
    const router = useRouter();

    const [login, setLoginState] = useState(false)



    function handleLogout() {
        logOut();
        setLoginState(false)

    }

    function handleGoogleLogin() {
        googleSignIn()
        setLoginState(true)
    };

    useEffect(() => {
        if (login == true) {
            router.push("/profile")
        }
    }, [login])


    
    return(
       <main>
                { user ? (
                    <LogoutIcon sx={{ ml: 4 }} onClick={handleLogout}></LogoutIcon>
                    
                ) : ( 
                    <LoginIcon sx={{ ml: 4 }} onClick={handleGoogleLogin}></LoginIcon>
                )}
     </main>

    )
};

export default Login;