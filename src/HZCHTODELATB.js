import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import Style from './App.css';
import NoteList from "./Components/NoteList";
import RedactorRX from "./Components/Redactor";

const FilterType =
{
    none: 1,
    byTag: 2,
    byTitle: 3
}

function getDate() {
    const date = new Date();
    return date.getDay() + '.' + date.getUTCMonth() + 1 + '.' + date.getFullYear();
}

function GetNewNote(oldNote) {
    let note = new Note();
    note.id = oldNote.id;
    note.title = oldNote.title;
    note.note = oldNote.note;
    note.date = oldNote.date;
    note.tags = oldNote.tags;
    return note;
}

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

function GetNewState() {
    let newState = new State();
    newState.notes = [
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
    newState.notesCounter = 2;
    return newState;
}

class State {
    constructor() {
        this.notes = [];
        this.isRedactorView = true;
        this.notesCounter = 0;
        this.isShortViewType = true;
        this.filterType = FilterType.none + '';
        this.searchString = '';
        this.selectedNote = new Note();
    }
}

function ChangeState(oldState) {
    debugger;
    let state = GetNewState();
    state.notes = oldState.notes;
    state.isRedactorView = true;
    state.notesCounter = 2;
    state.isShortViewType = true;
    state.filterType = FilterType.none + '';
    state.searchString = '';
    state.selectedNote = new Note();
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.Reducers = combineReducers({
            state: (state = GetNewState(), action) => {
                switch (action.type) {
                    case 'ON_TITLE_CHANGE': {
                        let newState = state;
                        newState.selectedNote.title = action.text;
                        return newState;
                    }
                    case 'ON_NOTE_TEXT_CHANGE': {
                        let newState = state;
                        newState.selectedNote.note = action.text;
                        return state;
                    }
                    case 'ON_TAGS_CHANGE': {
                        let newState = ChangeState(state);
                        newState.selectedNote.tags = action.text.split('#').filter(tag => tag);
                        return newState;
                    }
                    case 'ON_SAVE_BUTTON_CLICK': {
                        debugger;
                        let note = state.selectedNote;
                        if (!note.title) return null;
                        if (note.id === -1) {
                            //const notes = [...this.notes];
                            note.id = this.notesCounter;
                            note.date = getDate();
                            state.selectedNote = note;
                            //this.notes()
                            //this.notes.push(note);
                            return state;
                        }
                        else {
                            let item = this.state.notes[state.id];
                            item.title = state.title;
                            item.note = state.note;
                            item.tags = state.tags;
                            this.setState({
                                notes: this.state.notes,
                            });
                        }
                        //HideRedactor();
                    }
                    case 'ADD_NOTE':
                        return state.concat(this.selectedNote)
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
                note.date = getDate();
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
                        <input style={{ width: '30vw' }} onChange={this.onSearchStringChange} placeholder={'Search'} /><br />
                        <div>Filter&nbsp;
                        <select onChange={this.onFilterChange}>
                                <option value={FilterType.none}>None</option>
                                <option value={FilterType.byTitle}>Titles</option>
                                <option value={FilterType.byTag}>Tags</option>
                            </select>
                        </div>
                        <div>
                            View&nbsp;
                        <select onChange={this.onViewChange}>
                                <option value={'true'}>Сompact</option>
                                <option value={''}>Extended</option>
                            </select>
                        </div>
                        <NoteList isShortView={this.state.isShortViewType} noteSelector={this.onItemChange}
                            notes={this.notes} />
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
