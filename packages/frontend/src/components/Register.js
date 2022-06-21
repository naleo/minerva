import React, { useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import DatePicker from "react-datepicker";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { isEmail } from "validator";

const required = (value) => {
    if (!value) {
        return (
            <div className="text-sm font-medium mt-1 block text-red-500">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="text-sm font-medium mt-1 block text-red-500">
                Invalid email address!
            </div>
        );
    }
};

const Register = () => {
    const form = useRef();
    const checkBtn = useRef();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState(new Date());
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gradeLevel, setGradeLevel] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const onChangeFirstName = e => setFirstName(e.target.value);
    const onChangeLastName = e => setLastName(e.target.value);
    const onChangeBirthDate = date => setBirthDate(date);
    const onChangeUsername = e => setUsername(e.target.value);
    const onChangeEmail = e => setEmail(e.target.value);
    const onChangePassword = e => setPassword(e.target.value);
    const onChangeGradeLevel = e => setGradeLevel(e.target.value);

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();
        
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(
                firstName,
                lastName,
                birthDate,
                username,
                email,
                password,
                gradeLevel)
                .then(
                    (response) => {
                        setMessage(response.data.message);
                        setSuccessful(true);
                        navigate("/login")
                    },
                    (error) => {
                        const resMessage = 
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                        setMessage(resMessage);
                        setSuccessful(false);
                    }
                )
        }


    };
    return (
        <div className="p-4 m-auto max-w-sm bg-white rounded-lg overflow-hidden shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
            <Form onSubmit={handleRegister} ref={form} className="space-y-6">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                    Register
                </h5>
                <div>
                    <label
                        htmlFor="firstName"
                        className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        First Name
                    </label>
                    <Input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                        name="firstName"
                        value={firstName}
                        onChange={onChangeFirstName}
                        validations={[required]}
                    />
                    <label
                        htmlFor="lastName"
                        className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Last Name
                    </label>
                    <Input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                        name="lastName"
                        value={lastName}
                        onChange={onChangeLastName}
                    />
                    <label
                        htmlFor="birthDate"
                        className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Birth Date
                    </label>
                    <DatePicker
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                        name="birthDate"
                        selected={birthDate}
                        onChange={onChangeBirthDate}
                    />
                    <label
                        htmlFor="username"
                        className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Username
                    </label>
                    <Input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required]}
                    />
                    <label
                        htmlFor="email"
                        className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Email
                    </label>
                    <Input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                        validations={[required,validEmail]}
                    />
                    <label
                        htmlFor="password"
                        className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Password
                    </label>
                    <Input
                        type="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required]}
                    />
                    <label
                        htmlFor="gradeLevel"
                        className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Grade Level
                    </label>
                    <Input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                        name="gradeLevel"
                        value={gradeLevel}
                        onChange={onChangeGradeLevel}
                        validations={[required]}
                    />
                </div>
                <div>
                    <button
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus-outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 focus:outline-none">
                            <span>Register</span>
                        </button>
                </div>
                {message && (
                    <div>
                        <div>
                            {message}
                        </div>
                    </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </div>
    );
};

export default Register;
