import React, { Component } from 'react'
import {checkIsLoggedIn,getUser} from "../redux/Action"
import {connect} from 'react-redux'
// import { Redirect } from 'react-router-dom'

class Home extends Component {

componentDidMount(){
   this.props.checkIsLoggedIn()
   
}

    render() {
        if(this.props.isLoggedIn){
            const token = this.props.token
            const url = "http://127.0.0.1:5000"
            this.props.getUser(url,token)   
        }

        return (
            <div>
                <div className="text-center m-auto display-1">
                    <img src="img/blog_home.jpeg" style={{width:"100%", height:"43vw"}}/>
                </div>
            </div>
        )
        }    
}

const mapStateToProps = (state) => ({
    token :state.commonReducer.token
})

const mapDispatchToProps = dispatch => ({
    checkIsLoggedIn:()=>dispatch(checkIsLoggedIn()),
    getUser :(url,token)=>dispatch(getUser(url,token))

})

export default connect (mapStateToProps,mapDispatchToProps)(Home)
