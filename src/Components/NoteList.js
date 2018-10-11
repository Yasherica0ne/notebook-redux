import React from 'react';
import NoteRX from "./Note";
import { connect } from "react-redux";

export class NoteList extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        const notes = this.props.notes;
        return (
            notes !== undefined &&
            <div>
                {notes.map((note) => (
                    <NoteRX
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        date={note.date}
                        tags={note.tags}
                    />
                ))}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        notes: state.notes
    };
}

const NoteListRX = connect(mapStateToProps)(NoteList);

export default NoteListRX;