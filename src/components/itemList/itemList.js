import React, {Component} from 'react';
import './itemList.css';

import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';
import gotService from '../../services/gotService';



export default class ItemList extends Component {

    gotService = new gotService();

    state = {
        itemList: null,
        error: false
    }
    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then((itemList) => {
                this.setState({
                    itemList,
                    error: false
                });
            })
            .catch(() => {this.onError()});
    }
    componentDidCatch(){
        this.setState({
            charList: null,
            error: true
        })
    }
    onError(status){
        this.setState({
            charList: null,
            error: true
        })
    }
    renderItems(arr) {
        return arr.map((item) => {
            const {id, name} = item;
            const label = this.props.renderItem(item);
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                    >
                    {label}
                </li>
            )
        })
    }


    render() {
        const {itemList, error} = this.state;

        if(error){
            return <ErrorMessage/>
        }

        if(!itemList) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}