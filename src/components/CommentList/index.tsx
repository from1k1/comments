import * as React from 'react';
import { connect } from 'react-redux';
interface IProps{
    comments:Array<string>
}
const CommentListTemp: React.SFC<IProps> = (props) => {
    return (
        <div>
            <h4>Comment List</h4>
            <ul className="list-group">
                {props.comments.map(comment=>{
                    return <li className="list-group-item" key={comment}>{comment}</li>
                })}
            </ul>
        </div>
    );
}
function mapStateToProps(state:IProps){
    return {comments:state.comments};
}
export const CommentList = connect(mapStateToProps)(CommentListTemp);