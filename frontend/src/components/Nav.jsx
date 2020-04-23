import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { checkIsLoggedIn ,signOut} from "../redux/Action"

class Nav extends Component {
    componentDidMount() {
        this.props.checkIsLoggedIn()
    }

    render() {
        return (
            <div >
                <nav className="mb-1 navbar navbar-expand-lg navbar-dark blue lighten-2">
                    <a className="navbar-brand" href="nothing">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555"
                        aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent-555">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to = "/">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            {(this.props.token==="")?(<li className="nav-item">
                                <Link className="nav-link" to="/auth/register">Register</Link>
                            </li>):''}
                            
                        </ul>
                        {(this.props.token) ? (<ul className="navbar-nav ml-auto nav-flex-icons">
                            <li className="nav-item avatar  my-auto">
                                <Link className="nav-link p-0" to="/user">
                                    <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg" className="rounded-circle z-depth-0 my-auto mx-4"
                                        alt="avatar" height="45" />
                                </Link>
                            </li>
                            <li className="nav-item avatar">
                                        <button onClick={this.props.signOut} className="btn btn-danger">Logout</button>
                            </li>
                        </ul>) :
                            (
                                <ul className="navbar-nav ml-auto nax-flex-icons">
                                    <li className="nav-item">
                                         <Link className="nav-link" to="/auth/login">Login</Link>
                                    </li>
                                </ul>
                            )
                        }
                    </div>
                </nav>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    ...state,
    token: state.commonReducer.token
})

const mapDispatchToProps = dispatch => ({
    checkIsLoggedIn: () => dispatch(checkIsLoggedIn()),
    signOut :()=>dispatch(signOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
