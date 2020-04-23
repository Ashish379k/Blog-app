import React, { Component } from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import MyRoute from '../../frontend/src/routes/route'
import Nav from './components/Nav'


class App extends Component {
    render() {
        return (
            <Router>
                <Nav/>
                <MyRoute/>
            </Router>
        )
    }
}

export default App
