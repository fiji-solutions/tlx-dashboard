// import React, {useState} from "react";
// import {AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js";
// import {poolData, UserPool} from "../UserPool";
// import {Button, Grid, TextField} from "@mui/material";
//
// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//
//     const onSuccess = () => {
//         localStorage.setItem("email", email);
//         localStorage.setItem("cognito-token", localStorage.getItem(`CognitoIdentityServiceProvider.${poolData.ClientId}.${email}.idToken`));
//         localStorage.setItem("cognito-refresh-token", localStorage.getItem(`CognitoIdentityServiceProvider.${poolData.ClientId}.${email}.refreshToken`));
//         window.dispatchEvent(new Event("cognito-token-change"));
//         window.location.href = "/";
//     };
//
//     const onFailure = (err) => {
//         console.log(err);
//     };
//
//     const newPasswordRequired = (data) => {
//         console.log(data);
//     };
//
//     const onSubmit = (event) => {
//         event.preventDefault();
//
//         const user = new CognitoUser({
//             Username: email,
//             Pool: UserPool,
//         });
//
//         const authDetails = new AuthenticationDetails({
//             Username: email,
//             Password: password,
//         });
//
//         user.authenticateUser(authDetails, {
//             onSuccess,
//             onFailure,
//             newPasswordRequired,
//         });
//     };
//
//     return (
//         <Grid
//             container
//             justifyContent={"center"}
//             alignItems={"center"}
//             direction={"column"}
//             spacing={1}
//         >
//             <Grid item>
//                 <h1 className="text-align-center">Login</h1>
//             </Grid>
//
//             <Grid item>
//                 <TextField
//                     label="Username"
//                     type="text"
//                     InputProps={{inputProps: {min: 1}}}
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                     value={email}
//                     onChange={(event) => setEmail(event.target.value)}
//                 />
//             </Grid>
//
//             <Grid item>
//                 <TextField
//                     label="Password"
//                     type="password"
//                     InputProps={{inputProps: {min: 1}}}
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                     value={password}
//                     onChange={(event) => setPassword(event.target.value)}
//                 />
//             </Grid>
//
//             <Grid item>
//                 <Button disabled={!email || !password} variant="contained" onClick={onSubmit}>
//                     Login
//                 </Button>
//             </Grid>
//         </Grid>
//     );
// };
//
// export default Login;
