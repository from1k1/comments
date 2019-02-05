import * as React from 'react';
import { connect } from 'react-redux';
import { ICommentBoxProps } from '../../CommentBox';
import * as actions from '../../../actions';
import { IUserListProps } from '../../UserList';
import * as axios from 'axios';
interface IHOCProps extends ICommentBoxProps, IUserListProps {
    user: boolean;
    history: string[];
    getAccessToken: () => Object;
    verifyToken: () => boolean;
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
            const authToken = localStorage.getItem("UserTOKEN");
            console.log("HOC PROPS:",this.props);
            if (this.props.user) {
                this.props.verifyToken();
            } else {
                this.props.history.push("/");
                await this.props.getAccessToken();
            }
        }
        public render() {
            console.log("END AUTH PROPS:", this.props);
            return (<ChildComponent {...this.props} />);
        }
    }

    return ComposedComponent;

}
function mapStateToProps(state: IHOCProps) {
    console.log(state);
    return {
        user: state.user,
        userlist: state.userlist
    };
}

export const requireAuth = (c: React.ComponentType<any>) => connect(mapStateToProps, actions)(_requireAuth(c))