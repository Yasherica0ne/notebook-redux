import React from "react";
import { connect } from "react-redux";
import ReactMarkdown from 'react-markdown';
import RedactorStyle from './Styles/Redactor.css';
import ExtFunctions from "./Other";

class Redactor extends React.Component {

    constructor(props) {
        super(props);

        this.onNewNoteButtonClick = () => {
            this.props.showRedactor();
            this.props.onNewNoteButtonClick();
        }

        this.onSaveButtonClick = () => {
            let newNote = this.props.selectedNote;
            if (!newNote.title) return null;
            if (newNote.id === -1) {
                newNote.id = this.props.notesCounter;
                this.props.onIdIncrement();
                newNote.date = ExtFunctions.getDate();
                //this.notes()
                //this.notes.push(note);
                this.props.AddNote(newNote);
                this.props.ClearSelectedNote();
            }
            else {
                let item = this.props.notes[newNote.id];
                item.title = newNote.title;
                item.note = newNote.note;
                item.tags = newNote.tags;
            }
            this.props.hideRedactor();
        }
    }


    render() {
        return (
            this.props.isRedactorVisible &&
            <React.Fragment>
                <input style={{ width: '30vw', marginBottom: '1vh' }} maxLength={50}
                    value={this.props.selectedNote.title}
                    onChange={this.props.onTitleChange}
                    placeholder={'Note tittle'} />
                <br />

                <button onClick={this.props.onRedactorButtonClick}>Redactor</button>
                <button onClick={this.props.onUserViewButtonClick}>View</button>
                <br />

                {this.props.isRedactor ?
                    <textarea cols={100} rows={25} value={this.props.selectedNote.note} onChange={this.props.onNoteTextChange}
                        placeholder={'Write there your note'} />
                    :
                    <ReactMarkdown source={this.props.selectedNote.note} />
                }
                <br />

                <input style={{ width: '35vw', marginBottom: '1vh' }} maxLength={50}
                    onChange={this.props.onTagsChange}
                    value={this.props.selectedNote.tags.join('#') }
                        placeholder={'Tag1#Tag2#Tag3'}
                    />
                <br />

                <button onClick={this.onSaveButtonClick}>Save</button>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectedNote: state.selectedNote,
        isRedactor: state.isRedactor,
        isRedactorVisible: state.isRedactorVisible,
        notes: state.notes,
        notesCounter: state.notesCounter,
        searchString: state.searchString,
        filterType: state.filterType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSaveButtonClick: () => dispatch({
            type: 'ON_SAVE_BUTTON_CLICK'

        }),
        hideRedactor: () => dispatch({
            type: 'ON_REDACTOR_VISIBILITY_CHANGE',
            visibility: false
        }),
        showRedactor: () => dispatch({
            type: 'ON_REDACTOR_VISIBILITY_CHANGE',
            visibility: true
        }),
        onIdIncrement: () => dispatch({
            type: 'INC_ID'

        }),
        onTagsChange: event => dispatch({
            type: 'ON_TAGS_CHANGE',
            text: event.target.value

        }),
        onRedactorButtonClick: () => dispatch({
            type: 'CHANGE_REDACTOR',
            view: true
        }),
        ClearSelectedNote: () => dispatch({
            type: 'CLEAR_NOTE'
        }),
        onUserViewButtonClick: () => dispatch({
            type: 'CHANGE_REDACTOR',
            view: false
        }),
        AddNote: (note) => dispatch({
            type: 'ADD_NOTE',
            note: note
        }),
        onNoteTextChange: event => dispatch({
            type: 'ON_NOTE_TEXT_CHANGE',
            text: event.target.value

        }),
        onTitleChange: event => dispatch({
            type: 'ON_TITLE_CHANGE',
            text: event.target.value

        }),
        // onNewNoteButtonClick: () => dispatch({
        //     type: 'CLEAR_NOTE'
        // }),
        FilterNotes: (text, filter) => dispatch({
            type: 'GET_NOTES_BY_FILTER',
            text: text,
            filter: filter
        })
    }
}

const RedactorRX = connect(mapStateToProps, mapDispatchToProps)(Redactor);

export default RedactorRX;