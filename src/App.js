import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import Style from './App.css';
import NoteListRX from "./Components/NoteList";
import RedactorRX from "./Components/Redactor";
import ControlsRX from "./Components/Controls";
import ExtFunctions from "./Components/Other";

function GetNewNote(oldNote) {
    let note = new Note();
    note.id = oldNote.id;
    note.title = oldNote.title;
    note.note = oldNote.note;
    note.date = oldNote.date;
    note.tags = oldNote.tags;
    return note;
}

const FilterType = ExtFunctions.FilterType;

// function GetRedactorDiv() {
//     return document.querySelector('#Redactor');
// }

// function ShowRedactor() {
//     let redactor = GetRedactorDiv();
//     redactor.style.visibility = 'visible';
// }

// function HideRedactor() {
//     let redactor = GetRedactorDiv();
//     redactor.style.visibility = 'hidden';
// }

(function FloatRedactor() {
    document.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset;
        document.querySelector('#RedactorBlock').style.marginTop = scrollTop + 'px';
    })
})();
const notes = [
    {
        id: 0,
        title: 'First note',
        note: '# Something important',
        date: '02.10.2018',
        tags: ['first', 'second', 'third']
    },
    {
        id: 1,
        title: 'Second note',
        note: '## Something important too',
        date: '03.10.2018',
        tags: ['first', 'second']
    }
];

class Note {
    constructor() {
        this.id = -1;
        this.title = '';
        this.note = '';
        this.date = '';
        this.tags = [];
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.Reducers = combineReducers({
            notes: (state = notes, action) => {
                switch (action.type) {
                    case 'ADD_NOTE': {
                        const newNotes = [...state];
                        newNotes.push(action.note);
                        state = newNotes;
                        return newNotes;
                    }
                    default:
                        return state;
                }
            },
            isRedactorVisible: (state = false, action) => {
                switch (action.type) {
                    case 'ON_REDACTOR_VISIBILITY_CHANGE':
                        return action.visibility;
                    default:
                        return state;
                }
            },
            isRedactor: (state = true, action) => {
                switch (action.type) {
                    case 'CHANGE_REDACTOR':
                        return action.view;
                    default:
                        return state;
                }
            },
            notesCounter: (state = 2, action) => {
                switch (action.type) {
                    case 'INC_ID':
                        return state + 1;
                    default:
                        return state;
                }

            },
            isShortViewType: (state = true, action) => {
                switch (action.type) {
                    case 'VIEW_CHANGE':
                        return action.view;
                    default:
                        return state
                }
            },
            filterType: (state = FilterType.none + '', action) => {
                switch (action.type) {
                    case 'CHANGE_FILTER':
                        return action.filter
                    default:
                        return state
                }
            },
            searchString: (state = '', action) => {
                switch (action.type) {
                    case 'SEARCH_STRING_CHANGE':
                        return action.text
                    default:
                        return state
                }
            },
            selectedNote: (state = new Note(), action) => {
                switch (action.type) {
                    case 'ON_TITLE_CHANGE': {
                        let note = GetNewNote(state);
                        note.title = action.text;
                        return note;
                    }
                    case 'ON_NOTE_TEXT_CHANGE': {
                        let note = GetNewNote(state);
                        note.note = action.text;
                        return note;
                    }
                    case 'ON_NOTE_SELECT': {
                        return action.note;
                    }
                    case 'ON_TAGS_CHANGE': {
                        let note = GetNewNote(state);
                        note.tags = action.text.split('#').filter(tag => tag);
                        return note;
                    }
                    case 'CLEAR_NOTE': {
                        return new Note();
                    }
                    default:
                        return state
                }
            },
        })

        this.store = createStore(this.Reducers);

        this.onNewNoteButtonClick = () => {
            this.store.dispatch({
                type: 'CLEAR_NOTE'
            });
            this.store.dispatch({
                type: 'ON_REDACTOR_VISIBILITY_CHANGE',
                visibility: true
            });
        }
    }


    render() {
        return (
            <Provider store={this.store}>
                <div style={{ marginTop: "2vh" }}>
                    <div style={{ position: 'absolute', width: '34vw', marginLeft: '1vw' }}>
                        <ControlsRX />
                        <NoteListRX />
                    </div>
                    <div style={{
                        marginLeft: '35vw',
                        position: 'absolute',
                        borderLeft: '1px solid gray',
                        paddingLeft: '1vh'
                    }}>
                        <button style={{ fontSize: '3vh' }} onClick={this.onNewNoteButtonClick}>Add note</button>
                        <hr />
                        <RedactorRX />
                    </div>
                </div>
            </Provider>
        );
    }
}

export default App;
