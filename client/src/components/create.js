import React, { useState } from "react";
import { useNavigate } from "react-router";
import validator from 'validator';
 
export default function Create() {
 const [form, setForm] = useState({
   email: "",
   password: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
 }
 
 function isValidPassword(password) {
    return validator.isStrongPassword(password, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1});
}

 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();

   if(!isValidEmail(form.email)) {
    window.alert("Email is invalid.");
    return;
   }
   if(!isValidPassword(form.password)) {
    window.alert("Password is not strong.");
    return;
   }
  console.log("This is onSubmit email console log : " + form.email);
  console.log("This is onSubmit e target value console log : " + e.target.value);
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ email: "", password: ""});
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Sign up</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="email">Email</label>
         <input
           type="text"
           className="form-control"
           id="email"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="password">Password</label>
         <input
           type="text"
           className="form-control"
           id="password"
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Sign up"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}