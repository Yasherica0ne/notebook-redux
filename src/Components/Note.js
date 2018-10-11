import React from 'react';
import { connect } from "react-redux";

class Note extends React.Component {

    constructor(props) {
        super(props);

        this.noteSelector = () => {
            this.props.showRedactor();
            this.props.noteSelector(this.props.note);
        }
    }

    render() {
        debugger;
        const tags = this.props.note.tags;

        return (
            this.props.isShortView ?
                <React.Fragment>
                    <hr />
                    <h3 style={{ cursor: 'pointer' }} onClick={this.noteSelector}>{this.props.note.title}</h3>
                </React.Fragment>
                :
                <React.Fragment>
                    <div>
                        <hr />
                        <h3 style={{ cursor: 'pointer' }} onClick={this.noteSelector}>{this.props.note.title}</h3>
                        <p>Date: {this.props.note.date}</p>
                        <p>Tags:
                            {tags.map((tag) => (
                                ` #${tag}`
                            ))}
                        </p>
                    </div>
                </React.Fragment>
        )
    }
}



function mapStateToProps(state, ownProps) {
    return {
        isShortView: state.isShortViewType,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        noteSelector: (item) => dispatch({
            type: 'ON_NOTE_SELECT',
            note: item
        }),
        showRedactor: () => dispatch({
            type: 'ON_REDACTOR_VISIBILITY_CHANGE',
            visibility: true
        }),
    }
}

const NoteRX = connect(mapStateToProps, mapDispatchToProps)(Note);

export default NoteRX;