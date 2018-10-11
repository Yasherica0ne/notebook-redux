import React from "react";
import { connect } from "react-redux";
import ReactMarkdown from 'react-markdown';
import RedactorStyle from './Styles/Redactor.css';
import ExtFunctions from "./Other";

class Redactor extends React.Component {

    constructor(props) {
        super(props);


        this.onSaveButtonClick = () => {
            debugger;
            let newNote = this.props.selectedNote;
            if (!newNote.title) return null;
            if (newNote.id === -1) {
                newNote.id = this.props.notesCounter;
                newNote.date = ExtFunctions.getDate();
                //this.notes()
                //this.notes.push(note);
                this.props.AddNote(newNote);
                this.props.ClearSelectedNote();
            }
            else {
                // let item = this.state.notes[newNote.id];
                // item.title = newNote.title;
                // item.note = newNote.note;
                // item.tags = newNote.tags;
                // this.setState({
                //     notes: this.state.notes,
                // });
            }
        }
    }


    render() {
        return (
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
                    value={this.props.selectedNote.tags.join(' ')}
                    placeholder={'#Tag1#Tag2#Tag3'} />
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
        selectedNote: state.selectedNote,
        notes: state.notes,
        notesCounter: state.notesCounter
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSaveButtonClick: () => dispatch({
            type: 'ON_SAVE_BUTTON_CLICK'

        }),
        onTagsChange: event => dispatch({
            type: 'ON_TAGS_CHANGE',
            text: event.target.value

        }),
        onRedactorButtonClick: () => dispatch({
            type: 'ON_REDACTOR_BUTTON_CLICK'
        }),
        ClearSelectedNote: () => dispatch({
            type: 'CLEAR_NOTE'
        }),
        onUserViewButtonClick: () => dispatch({
            type: 'ON_USER_VIEW_BUTTON_CLICK'
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

        })
    }
}

const RedactorRX = connect(mapStateToProps, mapDispatchToProps)(Redactor);

export default RedactorRX;