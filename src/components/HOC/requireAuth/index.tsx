import * as React from 'react';
import { connect } from 'react-redux';
interface IProps {
    auth: boolean;
    history: Array<string>;
}
export const requireAuth = <WrappedProps extends IProps>(ChildComponent: React.ComponentType<WrappedProps>) => {

    class ComposedComponent extends React.Component<WrappedProps, {}>{
        constructor(props: WrappedProps) {
            super(props);
        }
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

    function mapStateToProps(state: WrappedProps) {
        return {
            auth: state.auth
        };
    }
    
    return connect(mapStateToProps)(ComposedComponent);

}