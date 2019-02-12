import * as React from 'react';
import { requireAuth } from '../HOC/requireAuth';
import { getUserInfo } from '../../actions';
interface IUser {
    login: string;
    password: string;
    profile_pic: string;
    id: string;
}
interface IProps{
    userinfo: IUser,
    getUserInfo: () => Object
}
const _UserInfo: React.SFC<IProps> = (props) => {
    console.log("UserInfoProps:",props);
    if (!props.userinfo.login){
        props.getUserInfo();
    }
    return ( 
        <div className="col-md-6 offset-md-3 p-5 mt-5 white text-center z-depth-3">
            <h4 className="mt-2">{props.userinfo.login}</h4>
			<p className="">id: {props.userinfo.id}</p>
			<br/>
            <img className="img-fluid rounded-circle z-depth-1-half avatar-pic" src={props.userinfo.profile_pic}/>
        </div>
    )
}
export const UserInfo = requireAuth(_UserInfo);