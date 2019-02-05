import * as React from 'react';
import { connect } from 'react-redux';
import { User } from '../../models/user';
import * as actions from '../../actions';
import { requireAuth } from '../HOC/requireAuth';
export interface IUserListProps {
    userlist: Array<User>;
    getUserList: () => Object;
}
class _UserList extends React.Component<IUserListProps, {}>{
    constructor(props: IUserListProps) {
        super(props);
        console.log("USER LIST PROPS: ", props);
        const { userlist } = this.props;
        if (userlist) {
            props.getUserList();
        }
        console.log(props);
    }
    render() {
        return (
            <div className="row" >
                <div className="col-md-12">
                    <button className="btn btn-elegant" onClick={this.props.getUserList}>Обновить <i className="fas fa-circle-notch" /></button>
                </div>
                {this.props.userlist.map((user, key) => {
                    return (
                        <div className="col-md-4 my-2" key={key}>
                            <div className="white z-depth-2 rounded text-center p-3">
                                <h4>{user.login}</h4>
                                <img className="img-fluid rounded-circle z-depth-1-half avatar-pic" style={{ height: '200px' }} src={user.profile_pic} />
                            </div>
                        </div>
                    );
                })}
            </div >
        );

    }
}
function mapStateToProps(state: IUserListProps) {
    console.log(state);
    return { userlist: state.userlist };
}
export const UserList = requireAuth(_UserList);