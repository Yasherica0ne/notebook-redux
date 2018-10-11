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
                        return newNotes;
                    }
                    case 'GET_NOTES_BY_FILTER': {
                        debugger;
                        const value = action.text;
                        const filterType = action.filter;
                        switch (filterType) {
                            case `${FilterType.none}`:
                                return this.state.notes;
                            case `${FilterType.byTitle}`:
                                return this.state.notes.filter(note => note.title.includes(value));
                            case `${FilterType.byTag}`:
                                return this.state.notes.filter(note => note.tags.filter(tag => tag.includes(value)).length !== 0);
                        }
                    }
                    default:
                        return state;
                }
            },
            isRedactorVisible: (state = true, action) => {
                switch (action.type) {
                    case 'TOGGLE_READCTOR_VISIBILITY':
                        return !state;
                    default:
                        return state;
                }
            },
            isRedactor: (state = true, action) => {
                switch (action.type) {
                    case 'TOGGLE_READCTOR':
                        return !state;
                    default:
                        return state;
                }
            },
            notesCounter: (state = 2, action) => {
                // switch (action.type) {
                //     case 'GET_ID':
                //         return state++;
                //     default:
                return ++state;

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

        this.store = createStore(this.Reducers)

        this.addNote = (note) => {
            this.store.dispatch({ type: 'ADD_NOTE', note: note })
        }

        this.state = {
            notes: [
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
            ],
            isRedactorView: true,
            notesCounter: 2,
            isShortViewType: true,
            filterType: FilterType.none + '',
            searchString: '',
            selectedNote: new Note()
        };

        this.onTitleChange = (e) => {
            this.state.selectedNote.title = e.target.value;
            this.setState({
                selectedNote: this.state.selectedNote
            })
        }
        this.onNoteChange = (e) => {
            this.state.selectedNote.note = e.target.value;
            this.setState({
                selectedNote: this.state.selectedNote
            })
        }
        this.onRedactorButtonClick = () => {
            this.setState({
                isRedactorView: true
            })
        }
        this.onUserViewButtonClick = () => {
            this.setState({
                isRedactorView: false
            })
        }
        this.onTagsChange = (e) => {
            this.state.selectedNote.tags = e.target.value.split(' ');
            this.setState({
                selectedNote: this.state.selectedNote
            })
        }
        this.onSearchStringChange = (e) => {
            this.setState({
                searchString: e.target.value
            })
        }
        this.onSaveButtonClick = () => {
            const note = this.state.selectedNote;
            if (!note.title) return null;
            if (note.id === -1) {
                const notes = [...this.state.notes];
                let note = this.state.selectedNote;
                note.id = this.state.notesCounter;
                note.date = ExtFunctions.getDate();
                notes.push(note);
                this.setState({
                    notesCounter: ++this.state.notesCounter,
                    notes: notes,
                });
            }
            else {
                let item = this.state.notes[note.id];
                item.title = note.title;
                item.note = note.note;
                item.tags = note.tags;
                this.setState({
                    notes: this.state.notes,
                });
            }
            //HideRedactor();
        }
        this.onFilterChange = (e) => {
            this.setState({
                filterType: e.target.value
            });
        }
        this.onViewChange = (e) => {
            this.setState({
                isShortViewType: e.target.value
            });
        }
        this.onItemChange = (e) => {
            //ShowRedactor();
            const item = this.state.notes[e.target.id];
            this.setState({
                selectedNote: item
            });
        }
        this.onNewNoteButtonClick = () => {
            //ShowRedactor();
            this.setState({
                selectedNote: new Note()
            });
        }
    }

    get notes() {
        const value = this.state.searchString;
        const filterType = this.state.filterType;

        switch (filterType) {
            case `${FilterType.none}`:
                return this.state.notes;
            case `${FilterType.byTitle}`:
                return this.state.notes.filter(note => note.title.includes(value));
            case `${FilterType.byTag}`:
                return this.state.notes.filter(note => note.tags.indexOf(value) !== -1);
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
                    <div id={'RedactorBlock'} style={{
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
