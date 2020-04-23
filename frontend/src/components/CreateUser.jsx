import React, { Component} from 'react'
import {createNewUser} from '../redux/Action'
import {connect} from 'react-redux'

class CreateUser extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name:'',
             email:'',
             password:'',
        }
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault()
        const url ='http://127.0.0.1:5000/auth/register'
        this.props.createNewUser(url,{...this.state})
        this.setState(()=>({
            name:'',
            email:'',
            password:'',
        }))
    }
    render() {
        return (
            <div className="container">
                <form className="text-center col-6 mx-auto p-4 bg-primary my-4 justify-content-center" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="name">Full Name</label>
                        <input onChange={this.handleChange} name = "name"type="text" className="form-control" value={this.state.name} id="name" placeholder="name@example.com"/>
                     </div>
                    <div className="form-group">
                        <label for="email">Email address</label>
                        <input  onChange={this.handleChange} name="email" type="email" value={this.state.email} className="form-control" id="email" placeholder="name@example.com"/>
                     </div>
                     <div className="form-group">
                        <label for="password">Password</label>
                        <input onChange={this.handleChange} name = "password" type="password" className="form-control" id="password" value={this.state.password} />
                     </div>
                    <button type ="submit" className="btn btn-success">ADD NEW USER</button>
                </form>
            </div>
                
        )
    }
}
const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch=>({
  createNewUser:(url,payload)=>dispatch(createNewUser(url,payload)),
})


export default connect (mapStateToProps,mapDispatchToProps)(CreateUser);