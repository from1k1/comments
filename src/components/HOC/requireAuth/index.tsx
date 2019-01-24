import * as React from 'react';
import { connect } from 'react-redux';
interface IProps {
    auth: boolean;
    history: Array<string>;
}
export const requireAuth = <WrappedProps extends IProps>(ChildComponent: React.ComponentType<WrappedProps>) => {
    class ComposedComponent extends React.Component<WrappedProps,{}>{
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
            const {...resProps} = this.props;
            return (<ChildComponent {...resProps} />)
        }
    }
    function mapStateToProps(state: IProps) {
        return { 
            auth: state.auth
        };
    }
    return connect(mapStateToProps)(ComposedComponent);
}