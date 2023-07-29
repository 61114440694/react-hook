import React, {useRef, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import "bootstrap/dist/css/bootstrap.min.css";

import {useForm} from "react-hook-form";
import {Button} from "react-bootstrap";

function Bootstrapform() {
    const [USnameError, setUSnameError] = useState('')
    const [USname, setUSname] = useState('')
    const [EmailError, setEmailError] = useState('')
    const [Email, setEmail] = useState('')
    const [item, setItem] = useState(1);
    const [data, setData] = useState("");
    const textUsername = useRef();
    const selectItem = useRef();


    const checkUsername = (e) => {
        setUSname(e)
    }

    function isValidEmail(email) {
        return /\S+@\S+.\S+/.test(email);
    }

    const checkItem = () => {
        setItem(selectItem.current.value);
    };

    const submitData = () => {
        setData(USname + " " + Email + " " + item);
    };

    const checkemail = (e) => {
        if (! isValidEmail(e.target.value)) {
            setEmailError("email ไม่ถูกต้อง")
        } else {
            setEmailError("")
            setEmail(e.target.value)
        }
    }
    // const okSubmit = (e) => {
    //     console.log(e)
    // }
    return (
        <>
            <form>
                <label htmlFor="username" className="form-label">
                    Username
                </label>
                <input type="text" name="username" placeholder="username"
                    ref={textUsername}
                    className="form-control"
                    onChange={checkUsername}
                    required></input>
                <h6 style={
                    {color: "red"}
                }>
                    {USnameError}</h6>
                <label htmlFor="password" className="form-label">
                    Password
                </label>
                <input type="password" name="password" placeholder="password" className="form-control" required></input>
                <label htmlFor="email" className="form-label">
                    E-mail
                </label>
                <input type="email" name="email" placeholder="your e-mail eg: someone@gmail.com" className="form-control"
                    onBlur={checkemail}></input>
                <h6 style={
                    {color: "red"}
                }>
                    {EmailError}</h6>
                <label htmlFor="selectItem" className="form-label">
                    Item
                </label>
                <select name="selectItem" className="form-select"
                    ref={selectItem}
                    onChange={checkItem}>
                    <option value="1">Item 1</option>
                    <option value="2">Item 2</option>
                    <option value="3">Item 3</option>
                </select>
                <Button className="my-3"
                    onClick={submitData}>
                    Submit
                </Button>
                <h4>{data}</h4>
            </form>
        </>
    );
}

function HookForm() {
    const {register, watch, handleSubmit, formState: {
            errors
        }} = useForm()

    const firstname = watch("firstname");
    const lastname = watch("lastname");
    const [data, setData] = useState("");

    return (
        <>

            <form onSubmit={
                handleSubmit((data) => {
                    setData(firstname + " " + lastname);
                })
            }>
                <input type='text' {...register("firstname",{required:"ต้องใส่ข้อมูลในช่องนี้"})} name='firstname' placeholder='first name'/>
                <p>{
                    errors.firstname ?. message
                }</p>
                <input type='text' {...register("lastname",{required:"ต้องใส่ข้อมูลในช่องนี้" , minLength:{value:5 , message: "ต้องมีความยาว 5 ตัวอักษรขึ้นไป"}})} name='lastname' placeholder='last name'/>
                <p>{
                    errors.firstname ?. message
                }</p>
                <input type='submit'/>
            </form>
            <h1> {data}</h1>
        </>
    )
}


function App(props) {
    return (
        <>
            <div className='m-5'>
                <Bootstrapform/>
                <HookForm/>
            </div>
        </>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render (
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
