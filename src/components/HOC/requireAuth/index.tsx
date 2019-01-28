import * as React from 'react';
import { connect } from 'react-redux';
import { ICommentBoxProps } from '../../CommentBox';
import * as actions from '../../../actions';
interface IHOCProps extends ICommentBoxProps {
    auth: boolean;
    history: string[];
}
export const _requireAuth = <T extends Object, TState>(ChildComponent: React.ComponentType<T>) => {
    class ComposedComponent extends React.Component<T & IHOCProps, TState>{
        componentDidMount() {
            this.accessHelper();
        }
        componentDidUpdate() {
            this.accessHelper();
        }
        accessHelper() {
            if (!this.props.auth) {
                this.props.history.push('/');
            }
        }
        render() {
            return (<ChildComponent {...this.props} />)
        }

    }

    return ComposedComponent;

}
function mapStateToProps(state: IHOCProps) {
    return {
        auth: state.auth,
    };
}

export const requireAuth = (c: React.ComponentType<ICommentBoxProps>) => connect(mapStateToProps, actions)(_requireAuth(c))