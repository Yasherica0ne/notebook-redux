import React from 'react';
import { connect } from "react-redux";

class Note extends React.Component {

    constructor(props){
        super(props);
    }


    render() {
        const id = this.props.id;
        const tags = this.props.tags;

        return (
            this.props.isShortView ?
                <React.Fragment>
                    <hr />
                    <h3 style={{ cursor: 'pointer' }} id={id} onClick={this.props.noteSelector}>{this.props.title}</h3>
                </React.Fragment>
                :
                <React.Fragment>
                    <div>
                        <hr />
                        <h3 style={{ cursor: 'pointer' }} id={id} onClick={this.props.noteSelector}>{this.props.title}</h3>
                        <p>Date: {this.props.date}</p>
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

function mapStateToProps(state) {
    return {
        isShortView: state.isShortViewType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        noteSelector: event => dispatch({
            type: 'ON_NOTE_SELECT',
            viewTypeObject: event.target
        })
    }
}

const NoteRX = connect(mapStateToProps, mapDispatchToProps)(Note);

export default NoteRX;