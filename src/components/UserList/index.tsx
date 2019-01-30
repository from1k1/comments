import * as React from 'react';
interface UserListProps{
    login:String;
    avatar:String;
}
export class _UserList extends React.Component<UserListProps,{}>{
    constructor(props:UserListProps){
        super(props);
    }
    render(){
        return(<h1>Здеся будут Узеры</h1>);
    }
}