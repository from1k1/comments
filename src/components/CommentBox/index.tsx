import * as React from 'react';
import { requireAuth } from '../HOC/requireAuth';
export interface ICommentBoxState {
    comment: string;
}
export interface ICommentBoxProps {
    saveComment: (comment: string) => {};
    fetchComments: () => {};
}
class CmntBox extends React.Component<ICommentBoxProps, ICommentBoxState>{
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

export const CommentBox = requireAuth(CmntBox);