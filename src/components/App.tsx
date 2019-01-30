import * as React from 'react';
import { CommentBox } from './CommentBox';
import { CommentList } from './CommentList';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import * as actions from '../actions';
import { Dispatch } from 'redux';
interface IProps {
    auth: boolean;
    changeAuth: (isLoggedIn: boolean) => Object;
}
class cApp extends React.Component<IProps, {}>{
    renderButton() {
        if (this.props.auth) {
            return (
                <button onClick={() => this.props.changeAuth(false)} className="btn peach-gradient btn-sm">
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={() => this.props.changeAuth(true)} className="btn aqua-gradient btn-sm">
                    Sign In
                </button>

            );
        }
    }
    public render() {
        return (
            <div className="mt-3">
                <header>
                    <ul className="nav justify-content-center">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/post">Оставить комментарий</Link></li>
                        <li className="nav-item">{this.renderButton()}</li>
                    </ul>
                </header>
                <div>
                    <Route path="/post" component={CommentBox} />
                    <Route path="/" exact component={CommentList} />
                </div>
            </div>
        );
    }
}
function mapStateToProps(state: IProps) {
    return { auth: state.auth };
}

export const App = connect(mapStateToProps, actions)(cApp);