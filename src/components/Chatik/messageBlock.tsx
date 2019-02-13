import * as React from 'react';
interface IProps {
    message: string;
}
export class MessageBlock extends React.Component<IProps>{
    render() {
        return (
            <div className="shadow p-3" style={{ height: '50px', background: '#ebebeb' }}>
                {this.props.message};
            </div>
        );
    }
}