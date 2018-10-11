import React from "react";
import { connect } from "react-redux";
import ExtFunctions from "./Other";

const FilterType = ExtFunctions.FilterType;

class Controls extends React.Component {

    constructor(props) {
        super(props);

        this.onSearchStringChange = (event) =>{
            this.props.onSearchStringChange(event.target.value);
            
            // this.props.FilterNotes(this.props.searchString, this.props.filterType);
        }

        this.onFilterChange = (event) =>{
            debugger;
            this.props.onFilterChange(event.target.value);
            this.props.FilterNotes(this.props.searchString, this.props.filterType);
        }
    }


    render() {
        const filter = FilterType;
        return (
            <React.Fragment>
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
                        <select onChange={this.props.onViewChange}>
                        <option value={'true'}>Сompact</option>
                        <option value={''}>Extended</option>
                    </select>
                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        filterType: state.filterType,
        searchString: state.searchString
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onFilterChange: (value) => dispatch({
            type: 'CHANGE_FILTER',
            filter: value
        }),
        onViewChange: event => dispatch({
            type: 'VIEW_CHANGE',
            view: event.target.value
        }),
        onSearchStringChange: (value) => dispatch({
            type: 'SEARCH_STRING_CHANGE',
            text: value
        }),
        FilterNotes: (text, filter) => dispatch({
            type: 'GET_NOTES_BY_FILTER',
            text: text,
            filter: filter
        })
    }
}

const ControlsRX = connect(mapStateToProps, mapDispatchToProps)(Controls);

export default ControlsRX;