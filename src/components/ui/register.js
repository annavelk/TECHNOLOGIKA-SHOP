// Компонент с формой регистрации пользователя

import React, { useState } from 'react'
import axios from 'axios';
import validator from 'validator';
import { DOMEN_SERVER, DOMEN_SITE } from '../../config/const';

export default function Register () {
    const [register, setRegister] = useState(() => {
        return {
            username: "",
            email: "",
            password: "",
            password2: "",
        }
    })
     
    const changeInputRegister = event => {
        event.persist()
        setRegister(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }
     
     
    const submitChackin = event => {
        event.preventDefault();
        if(!validator.isEmail(register.email)) {
            alert("Будьте внимательнее, Вы не ввели адрес электронной почты или ввели не правильно!")
        } else if(register.password !== register.password2) {
            alert("К сожалению, пароли не совпадают")
        } else if(!validator.isStrongPassword(register.password, {minSymbols: 0})) {
            alert("Пароль должен состоять не менее чем из 8 символов: минимум одной строчной и одной прописной букв и цифр")
        } else {
            axios.post(DOMEN_SERVER + "/auth/registration/", {
                username: register.username,
                email: register.email,
                password: register.password,
            }).then(res => {
                if (res.data === true) {
                    window.location.href = DOMEN_SITE + "/auth"
                } else {
                    alert("Пользователь с таким адресом электронной почты уже есть")
                }
            }).catch(() => {
                alert("Упс... произошла ошибка на сервере")
            })
        }
    }
    return (
        <div className="form">
            <h2>Регистрация:</h2>
            <form onSubmit={submitChackin}>
                <p>Имя: <input 
                type="username"
                id="username"
                name="username"
                value={register.usernamr}
                onChange={changeInputRegister}
                /></p>
                <p>Email: <input 
                type="email"
                id="email"
                name="email"
                value={register.email}
                onChange={changeInputRegister}
                formnovalidate
                /></p>
                <p>Пароль: <input 
                type="password"
                id="password"
                name="password"
                value={register.password}
                onChange={changeInputRegister}
                /></p>
                <p>Повтор пароля: <input 
                type="password"
                id="password2"
                name="password2"
                value={register.password2}
                onChange={changeInputRegister}
                    /></p>
                <input type="submit"/>
            </form>
        </div>
    )
}