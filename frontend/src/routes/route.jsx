import React from 'react'
import {Route,Switch} from 'react-router-dom'
import Home from '../components/Home'
import RegisterUser from '../components/CreateUser'
import LoginPage from "../components/LoginPage"
import Userdetail from '../components/Userdetail'
import BlogWrite from "../components/BlogWrite"
import Editprofile from '../components/Editprofile'
import Myblog from '../components/Myblog'


export default function MyRoute(props) {
    return (
        <>
            <Switch>
                <Route exact path ='/' component = {Home}/>
                <Route exact path ='/auth/login' component = {(props)=><LoginPage {...props}/>}/>
                <Route path ='/auth/register' component = {RegisterUser}/>
                <Route exact path ="/user" component = {Userdetail}/>
                <Route path ="/user/myblog" component ={Myblog}/>
                <Route path ="/user/newblog" component={BlogWrite}/>
                <Route path = "/user/Edit" component={Editprofile}/>
            </Switch>
        </>
    )
}
