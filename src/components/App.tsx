import * as React from 'react';
import { CommentBox } from './CommentBox';
import { CommentList } from './CommentList';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { UserList } from '../components/UserList';
import * as actions from '../actions';
import { Dispatch } from 'redux';
import { UserInfo } from './UserInfo';
import { Chatik } from './Chatik';
interface IProps {
    user: boolean;
    getAccessToken: () => Object;
    verifyToken: () => Object;
    deleteToken: () => Object;
}
class cApp extends React.Component<IProps, {}>{
    componentWillMount() {
        this.props.verifyToken();
        console.log("Token verified in APP");
    }
    renderButton() {
        if (this.props.user === true) {
            return (
                <button onClick={this.props.deleteToken} className="btn peach-gradient btn-sm">
                    Выйти
                </button>
            );
        } else {
            return (
                <button onClick={() => this.props.getAccessToken()} className="btn aqua-gradient btn-sm">
                    Войти
                </button>

            );
        }
    }
    public render() {
        console.log("APP PROPS:", this.props);
        return (
            <div className="mt-3">
                <header>
                    <ul className="nav justify-content-center">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/chatik">Чатик</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/post">Оставить комментарий</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/userlist">Список пользователей</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/me">Профиль</Link></li>
                        <li className="nav-item">{this.renderButton()}</li>
                    </ul>
                </header>
                <div>
                    <Route path="/post" component={CommentBox} />
                    <Route path="/chatik" component={Chatik} />
                    <Route path="/me" component={UserInfo} />
                    <Route path="/userlist" component={UserList} />
                    <Route path="/" exact component={CommentList} />
                </div>
            </div>
        );
    }
}
function mapStateToProps(state: IProps) {
    console.log("FCKING STATE:", state)
    return ({
        user: state.user
    });
}
export const App = connect(mapStateToProps, actions)(cApp);