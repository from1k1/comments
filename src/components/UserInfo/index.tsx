import * as React from 'react';
import { requireAuth } from '../HOC/requireAuth';
import { getUserInfo } from '../../actions';
interface IUser {
    login: string;
    password: string;
    profile_pic: string;
    id: number
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
        <div className="col-md-6 offset-md-3 grey text-center z-depth-3">
            <h1>{props.userinfo.login}</h1><br/>
            <img src={props.userinfo.profile_pic}/>
        </div>
    )
}
export const UserInfo = requireAuth(_UserInfo);