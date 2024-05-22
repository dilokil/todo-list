import React, {Component, useState} from "react";

import UserService from "../services/UserService";
import EventBus from "../common/EventBus";
import TodoList from "./TodoList";

export default class BoardUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: []
        };

    }

    componentDidMount() {
        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }

    render() {
        if (this.state.content !== []) {
            return (
                <div className="container">
                    <header className="jumbotron">
                        <TodoList boards={this.state.content} setBoards={(el) => this.setState({content: el})}/>
                    </header>
                </div>
            );
        }

    }
}