import React from 'react';
import NoteRX from "./Note";
import { connect } from "react-redux";
import ExtFunctions from "./Other";

const FilterType = ExtFunctions.FilterType;

export class NoteList extends React.Component {

    constructor(props) {
        super(props);
        
        this.getNotes = () => {
            const notes = this.props.notes;
            const value = this.props.searchString;
            const filterType = this.props.filterType;
            switch (filterType) {
                case `${FilterType.none}`:
                    return notes;
                case `${FilterType.byTitle}`:
                    return notes.filter(note => note.title.includes(value));
                case `${FilterType.byTag}`:
                    return notes.filter(note => note.tags.filter(tag => tag.includes(value)).length !== 0);
            }
        }

    }

    render() {
        const notes = this.getNotes();
        return (
            notes !== undefined &&
            <div>
                {notes.map((note) => (
                    <NoteRX
                        key={note.id}
                        note={note}
                    />
                ))}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        notes: state.notes,
        searchString: state.searchString,
        filterType: state.filterType
    };
}

const NoteListRX = connect(mapStateToProps)(NoteList);

export default NoteListRX;