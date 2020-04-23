import React, { Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from "react-redux"
import {signOut,checkIsLoggedIn,getUser} from '../redux/Action'
import {getBlog} from "../redux/BlogAction"
import SideNavPage from './Sidenav'
import Userblogcard from "./Userblogcard"

 class Myblog extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              myBlogs:[]
         }
     }
     
   async componentDidMount(){
       this.props.checkIsLoggedIn()
        const token = this.props.token
        const url = "http://127.0.0.1:5000"
        this.props.getUser(url,token)
        let blogurl = "http://127.0.0.1:5000/auth/blogs"
        this.props.getBlog(blogurl)
        var myBlogs = this.props.blogs.filter(ele=>ele.user_id===this.props.user.id)
        this.setState({
            myBlogs:[...myBlogs]
        })
    }
    updateMyBlogs = () => {
       var  myBlogs = this.props.blogs.filter(ele=>ele.user_id===this.props.user.id)
       this.setState({
           myBlogs:[...myBlogs]
       })
    }
    render() {
        if(this.props.token){
        return (
            <>
            <div className="my-2 mx-auto justify-content-center">
                <h1 className="btn-grey m-auto text-center">My Blog page</h1>
            <div className="row">
                <div className="col-1">
                    <SideNavPage user={this.props.user}/>
                </div>
                <div className="col-11 my-4">
                    <div className="row">
                        {this.state.myBlogs.map(ele=>(<div className="col-sm-12 col-md-6 col-lg-6 my-4" style={{height:"80%"}}><Userblogcard data={ele} updateMyBlogs={this.updateMyBlogs}/></div>))}
                        
                    </div>
                </div>
            </div>
            </div>
            </>
        )}
        else{
            return (<Redirect to="/auth/login"/>)
        }
    }
}
const mapStateToProps = (state) => ({
    ...state,
    token:state.commonReducer.token,
    user:state.commonReducer.user,
    blogs:state.blogReducer.blogs
})

const mapDispatchToProps = dispatch => ({
    signOut:()=>dispatch(signOut()),
    checkIsLoggedIn:()=>dispatch(checkIsLoggedIn()),
    getUser:(url,token)=>dispatch(getUser(url,token)),
    getBlog:(url)=>dispatch(getBlog(url))
})

export default connect (mapStateToProps,mapDispatchToProps)(Myblog)

