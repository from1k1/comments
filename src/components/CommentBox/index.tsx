import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { requireAuth } from '../HOC/requireAuth';
interface IState {
    comment: string;
}
interface IProps {
    auth: boolean;
    saveComment: (comment: string) => {};
    fetchComments: () => {};
    history: Array<string>;
}
class CmntBox extends React.Component<IProps, IState>{
    constructor(props: any) {
        super(props);
    }
    state = {
        comment: ''
    }
    handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        this.setState({ comment: event.currentTarget.value });
    };
    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (this.state.comment) {
            this.props.saveComment(this.state.comment);
        }

        this.setState({ comment: '' });
    }
    public render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Добавить комментарий</h2>
                    <textarea onChange={this.handleChange} value={this.state.comment} />
                    <div>
                        <button type="submit">Отправить</button>
                    </div>
                </form>
                <button onClick={this.props.fetchComments}>Получить комменты</button>
            </div>
        );
    }
}

export const CommentBox = connect(null, actions)(requireAuth(CmntBox));