import * as React from 'react';
import { connect } from 'react-redux';
import { ICommentBoxProps } from '../../CommentBox';
import * as actions from '../../../actions';
import { IUserListProps } from '../../UserList';
import * as axios from 'axios';
interface IUser {
    login: string;
    password: string;
    profile_pic: string;
    id: number
}
interface IHOCProps extends ICommentBoxProps, IUserListProps {
    user: boolean;
    history: string[];
    getAccessToken: () => Object;
    verifyToken: () => boolean;
    userinfo: IUser;
    messages: Array<string>;
}
export const _requireAuth = <T extends Object, TState>(ChildComponent: React.ComponentType<T>) => {
    class ComposedComponent extends React.Component<T & IHOCProps, TState>{
        componentDidMount() {
            this.accessHelper();
        }
        componentDidUpdate() {
            this.accessHelper();
        }
        async accessHelper() {
            if (!this.props.user && (localStorage.getItem("UserTOKEN") === undefined)) {
                this.props.getAccessToken();
            } else {
                this.props.verifyToken();
            }
        }
        public render() {
            if (this.props.user) {
                return (<ChildComponent {...this.props} />);
            } else {
                return (<h1>E99O9: N0 4CC3SS</h1>)
            }
        }
    }

    return ComposedComponent;

}
function mapStateToProps(state: IHOCProps) {
    return {
        user: state.user,
        userlist: state.userlist,
        userinfo: state.userinfo,
        messages: state.messages
    };
}

export const requireAuth = (c: React.ComponentType<any>) => connect(mapStateToProps, actions)(_requireAuth(c))