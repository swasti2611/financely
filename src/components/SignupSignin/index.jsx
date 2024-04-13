import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db , provider} from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
const SignupSignin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();
  function signupWithEmail() {
    setLoading(true);
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(confirmPassword);

    //authentication the user and creating new Account with email and password
    if (
      name != " " &&
      email != " " &&
      password != "" &&
      confirmPassword != " "
    ) {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("User>>", user);
            toast.success("User Created");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            createDoc(user.uid);
            navigate("/dashboard");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Password and Confirm Password don't match !");
        setLoading(false);
      }
    } else {
      toast.error("All fields are manditory!");
      setLoading(false);
    }
  }

  function loginWithEmail() {
    console.log(email);
    console.log(password);
    setLoading(true);
    if (email != " " && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User Logged In!");
          setLoading(false);
          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    } else {
      toast.error("All field are manditory");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    //make sure that doc uid doent exist
    //create doc.
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: displayName ? displayName : name,
          email: user.email,
          photoURL: photoURL ? photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created!");
        setLoading(false);
      } catch (error) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("hey doc alredy exit");
      setLoading(false);
    }
  }

  // function googleAuth() {
  //   setLoading(true)
  //   signInWithPopup(auth, provider)
  //   .then((result) => {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;
  //     // The signed-in user info.
  //     const user = result.user;
  //     console.log("GoogleUser",user);
  //     toast.success("User authenticated!")
  //     // IdP data available using getAdditionalUserInfo(result)
  //     // ...
  //   })
  //   .catch((error) => {
  //     // Handle Errors here.
      
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     toast.error(errorMessage)
      
  //   });
  //   try {
      
  //   } catch (error) {
  //       toast.error(e.message)
  //   }
    
  // }

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await createUserDocument(user);
      toast.success("User Authenticated Successfully!");
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.error("Error signing in with Google: ", error.message);
    }
  };

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login on <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>

          <form>
            <Input
              lable={"Email"}
              type="email"
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              lable={"Password"}
              type="password"
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />

            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login Using Email and Password"}
              onClick={loginWithEmail}
            />
            <p className="p-login">or</p>
            <Button
            onClick={signInWithGoogle}
              text={loading ? "Loading..." : "Login Using Google"}
              blue={true}
            />

            <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
              or don't Have An Account ? Signup
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>

          <form>
            <Input
              lable={"Full Name"}
              type="text"
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />
            <Input
              lable={"Email"}
              type="email"
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              lable={"Password"}
              type="password"
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Input
              lable={"Confirm Password"}
              type="password"
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Example@123"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup Using Email and Password"}
              onClick={signupWithEmail}
            />
            <p className="p-login">or</p>
            <Button
              onClick={signInWithGoogle}
              text={loading ? "Loading..." : "Signup Using Google"}
              blue={true}
            />

            <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
              or Have An Account Already? Login
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignupSignin;
