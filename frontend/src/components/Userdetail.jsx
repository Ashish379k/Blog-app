import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from "react-redux"
import {signOut,checkIsLoggedIn,getUser} from '../redux/Action'
import {getBlog} from "../redux/BlogAction"
import SideNavPage from './Sidenav'
import Blogcard from "./Blogcard"

 class Userdetail extends Component {
    componentDidMount = async () => {
      await  this.props.checkIsLoggedIn()
        const token = this.props.token
        const url = "http://127.0.0.1:5000"
       await this.props.getUser(url,token)
        let blogurl = "http://127.0.0.1:5000/auth/blogs"
        this.props.getBlog(blogurl)
     }
    render() {
        if(this.props.isLoggedIn){
        return (
            <div className="my-2 mx-auto justify-content-center">
                <h1 className="btn-grey m-auto text-center">Tech and code Blog page</h1>
            <div className="row">
                <div className="col-1">
                    <SideNavPage/>
                </div>
                <div className="col-11 my-4">
                    <div className="row">
                        {this.props.blogs.map(ele=>(<div className="col-sm-12 col-md-6 col-lg-6 my-4" style={{height:"80%"}} key={ele.id}><Blogcard data={ele}/></div>))}
                        
                    </div>
                </div>
            </div>
            </div>
        )}
        else{
            return (<Redirect to="/auth/login"/>)
        }
    }
}
const mapStateToProps = (state) => ({
    ...state,
    token:state.commonReducer.token,
    isLoggedIn:state.commonReducer.isLoggedIn,
    user:state.commonReducer.user,
    blogs:state.blogReducer.blogs
})

const mapDispatchToProps = dispatch => ({
    signOut:()=>dispatch(signOut()),
    checkIsLoggedIn:()=>dispatch(checkIsLoggedIn()),
    getUser:(url,token)=>dispatch(getUser(url,token)),
    getBlog:(url)=>dispatch(getBlog(url))
})

export default connect (mapStateToProps,mapDispatchToProps)(Userdetail)

