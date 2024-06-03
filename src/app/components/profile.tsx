import {
    useSaveUserSettingsContext,
    useUserContext,
    useUserSettingsContext
} from "@/context/userContext" 
import { Button, TextField } from "@mui/material";

import {useEffect, useState} from "react"

const Profile = () => {
    const user = useUserContext();
    const userSettings = useUserSettingsContext();
    const saveUserSettings = useSaveUserSettingsContext();
    const [occupation, setOccupation] = useState("")
    const [organization, setOrganization] = useState("")
    const [linkedin, setLinkedin] = useState("")
    const [github, setGithub] = useState("")

    function handleSaveUser() {
        if (saveUserSettings != null) {
            saveUserSettings(occupation, organization, linkedin, github )
        }
    }    

    function handleOccupationChange(e: React.ChangeEvent<HTMLInputElement>){
        setOccupation(e.target.value)
    }

    function handleOrganizationChange(e: React.ChangeEvent<HTMLInputElement>){
        setOrganization(e.target.value)
    }

    function handleLinkedinChange(e: React.ChangeEvent<HTMLInputElement>){
        setLinkedin(e.target.value)
    }

    function handleGithubChange(e: React.ChangeEvent<HTMLInputElement>){
        setGithub(e.target.value)
    }

    useEffect(() => {
        if (userSettings != null) {
            setOccupation(userSettings.occupation)
            setOrganization(userSettings.organization)
            setLinkedin(userSettings.linkedin)
            setGithub(userSettings.github)
        }
    }, [userSettings])

    return (
        <div>
        { user != null ? (
            <div>
            <h3>name: {user?.displayName}</h3>
            <h3>email: {user?.email}</h3>
             <br/>
            <TextField id="outlined-basic" label="Occupation" variant="outlined" value={occupation} onChange={handleOccupationChange}/>
            <br/>
            <br/>
            <TextField id="outlined-basic" label="Organization" variant="outlined" value={organization} onChange={handleOrganizationChange}/>
            <br/>
            <br/>
            <TextField id="outlined-basic" label="LinkedIn" variant="outlined" value={linkedin} onChange={handleLinkedinChange}/>
            <br/>
            <br/>
            <TextField id="outlined-basic" label="GitHub" variant="outlined" value={github} onChange={handleGithubChange}/>
            <br/>
            <br/>
            <br></br>
            <Button variant="outlined" onClick={handleSaveUser}>Save User</Button>
            </div>
        ):(
            <div></div>
        )}
        </div>
    )
}

export default Profile;